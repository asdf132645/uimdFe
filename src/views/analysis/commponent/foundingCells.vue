<template>
  <div class="mt1">
    <transition name="fade" mode="out-in">
      <div class="slider" v-if="images.length > 0">
        <img v-for="type in images" :key="type.id" :src="getImageUrl(type)" alt="Slide" />
      </div>
    </transition>
  </div>
</template>



<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import { useStore } from 'vuex';
import { SlotInfo } from '@/store/modules/testPageCommon/ruuningInfo';
import {barcodeImgDir} from "@/common/defines/constFile/settings";
const apiBaseUrl = process.env.APP_API_BASE_URL || 'http://192.168.0.131:3002';

const store = useStore();
const images = ref<RunningPathItem[]>([]);
const runningInfoModule = computed(() => store.state.runningInfoModule);


interface RunningPathItem {
  path: string;
  id: string;
}



watch([runningInfoModule.value], (newSlot: SlotInfo[]) => {
  const firstItem = JSON.parse(JSON.stringify(newSlot))
  const slotInfo = firstItem[0].runningInfo?.slotInfo;
  if (slotInfo) {
    let accumulatedRunningPath: any = {};

    slotInfo.forEach((item: any) => {
      if (item.stateCd === '03' && item.runningPath && item.runningPath.length > 0) {
        const runningPath: RunningPathItem[] = item.runningPath.map((pathItem: any) => ({
          ...pathItem,
          // path: pathItem.path + '?' + getDateTimeStr(),
          path: pathItem.path,
          id: generateUniqueId()
        }));

        accumulatedRunningPath = runningPath;
      }
    });

    if (accumulatedRunningPath.length > 0) {
      images.value.push(accumulatedRunningPath);
    }
  }
});

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getImageUrl(types: RunningPathItem[] | undefined): string[] {
  if (!types || types.length === 0) {
    return [];
  }

  // 이미지의 URL들을 담을 배열
  const imageUrls: string[] = [];

  // 각 이미지의 URL을 가져와서 배열에 추가
  const folderPath = types[0].path.match(/^(.*\\)\d+_Real_Time\\/)?.[0];

  // 파일 경로에서 파일 이름 부분 추출
  const fileName = types[0].path.match(/[^\\]*$/);

  // 이미지의 URL 생성 후 배열에 추가
  const imageUrl = `${apiBaseUrl}/images?folder=${folderPath}&imageName=${fileName}`;
  imageUrls.unshift(imageUrl);

  return imageUrls;
}





</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.slider {
  position: relative;
  overflow: hidden;
  max-height: 135px;
}
.slider img {
  width: 12%;
}
button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
