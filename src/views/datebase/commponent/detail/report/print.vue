<template>
  <div style="width: 900px; height: 90%; overflow-y: auto; background: #fff; color: #000; position: absolute; top: 10%; left: 33%; box-sizing: border-box; padding: 3rem 7rem; border: 2px solid #ccc; border-radius: 10px; z-index:9999;">
    <button style="position: absolute; right: 8px; background: none; border: 1px solid #000; border-radius: 5px; padding: 7px 25px; top: 5px; cursor: pointer" @click="closePrint">Close</button>
    <div ref="printContent" style="margin-top: 20px;">
      <div>
        <h3 style="margin: 40px 0; font-size: 1.2rem; font-weight: 600; text-align: center;">Analysis Report from UIMD PB system</h3>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <table style="width: 100%;">
          <colgroup>
            <col style="width: 30%;"/>
            <col style="width: 70%;"/>
          </colgroup>
          <tbody>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Slot ID</th>
            <td style="text-align: left; padding: 5px 0;">{{ selectItems?.slotId }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Ordered date</th>
            <td style="text-align: left; padding: 5px 0;">{{ formatDateString(selectItems?.orderDttm) }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Signed by ID</th>
            <td style="text-align: left; padding: 5px 0;">{{ selectItems?.submitUserId }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Signed date</th>
            <td style="text-align: left; padding: 5px 0;">{{ selectItems?.submitOfDate }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left;">Ordered Classification</th>
            <td style="text-align: left; padding: 5px 0;">{{ getTestTypeText(selectItems?.testType) }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Name</th>
            <td style="text-align: left; padding: 5px 0;">{{ selectItems?.patientName }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Birth</th>
            <td style="text-align: left; padding: 5px 0;">{{ selectItems?.birthDay }}</td>
          </tr>
          <tr style="padding-bottom: 5px;">
            <th style="text-align: left; padding: 5px 0;">Gender</th>
            <td style="text-align: left; padding: 5px 0;">{{ selectItems?.gender === '01' ? 'Male' : 'Female' }}</td>
          </tr>

          </tbody>
        </table>
        <div style="margin-top: 20px; border-top: 2px dotted #696969">
          <!-- RBC Classification -->
          <div v-if="['01', '04'].includes(selectItems?.testType)" style="margin-top: 20px;">
            <h3 style="margin: 40px 0; font-size: 1.2rem; font-weight: 600; text-align: center;">RBC classification result</h3>
            <table style="width: 100%;">
              <colgroup>
                <col style="width: 30%;"/>
                <col style="width: 45%;"/>
                <col style="width: 25%;"/>
              </colgroup>
              <thead>
              <tr>
                <th style="text-align: left;">Category</th>
                <th style="text-align: left;">Class</th>
                <th style="text-align: left;">Degree</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(classList, outerIndex) in [selectItems?.rbcInfo]" :key="outerIndex">
                <template v-for="(category, innerIndex) in classList" :key="innerIndex">
                  <tr style="padding-bottom: 5px;">
                    <td style="text-align: left; padding: 5px 0;">{{ category.categoryNm }}</td>
                    <td style="text-align: left; padding: 5px 0;">
                      <template v-for="(classInfo, classIndex) in category?.classInfo" :key="classIndex">
                        <div>{{ classInfo?.classNm }}</div>
                      </template>
                    </td>
                    <td style="text-align: left; padding: 5px 0;">
                      <template v-for="(classInfo, classIndex) in category?.classInfo" :key="classIndex">
                        <div v-if="classInfo.classId !== '01' || category.categoryId === '05'">{{ classInfo?.degree }}</div>
                      </template>
                    </td>
                  </tr>
                </template>
              </template>
              <tr style="padding-bottom: 5px;">
                <th style="text-align: left; padding: 5px 0;">Others</th>
                <th style="text-align: left; padding: 5px 0;">Platelets</th>
                <th style="text-align: left; padding: 5px 0;">{{ selectItems?.rbcInfo.pltCount }} PLT / 1000 RBC</th>
              </tr>
              <tr style="padding-bottom: 5px;">
                <th></th>
                <th style="text-align: left; padding: 5px 0;">Malaria</th>
                <th style="text-align: left; padding: 5px 0;">{{ selectItems?.rbcInfo?.malariaCount }} / {{ selectItems.maxRbcCount }} RBC</th>
              </tr>
              <tr style="padding-bottom: 5px;">
                <!-- <th></th> -->
                <th style="text-align: left; padding: 5px 0;">Comment</th>
                <th style="text-align: left; padding: 5px 0;">{{ selectItems.rbcMemo }}</th>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- WBC Classification -->
          <div style="margin-top: 20px; border-top: 2px dotted #696969">
            <h3 style="margin: 40px 0; font-size: 1.2rem; font-weight: 600; text-align: center;">WBC classification result</h3>
            <table style="width: 100%;">
              <colgroup>
                <col style="width: 30%;"/>
                <col style="width: 45%;"/>
                <col style="width: 25%;"/>
              </colgroup>
              <thead>
                <tr>
                  <th style="text-align: left;">Class</th>
                  <th style="text-align: left;">Count</th>
                  <th style="text-align: left;">Percent</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="item in filteredWbcInfo" :key="item.id" style="padding-bottom: 5px;">
                <th style="text-align: left; padding: 5px 0;">{{ item?.name }}</th>
                <td style="text-align: left; padding: 5px 0;">{{ item?.count }}</td>
                <td style="text-align: left; padding: 5px 0;">{{ item?.percent }} %</td>
              </tr>
              <tr style="padding-bottom: 5px;">
                <th style="text-align: left; font-weight: bold; padding: 5px 0;">Total count</th>
                <td style="text-align: left; padding: 5px 0;">{{ selectItems?.wbcInfo?.totalCount }}</td>
                <td style="text-align: left; padding: 5px 0;">100.00%</td>
              </tr>
              <!-- <tr v-for="item in filteredWbcInfo" :key="item.id" style="padding-bottom: 5px;">
                <th style="text-align: left; padding: 5px 0;">{{ item?.name }}</th>
                <td colspan="1" style="text-align: left; padding: 5px 0;">{{ item?.count }}
                  <span v-if="item.id === '12' || item.id === '13'"> / {{ selectItems?.wbcInfo?.maxWbcCount }} WBC</span>
                </td>
              </tr> -->
              <tr style="padding-bottom: 5px;">
                <th style="text-align: left; padding: 5px 0;">Comment</th>
                <td colspan="2" style="text-align: left; padding: 5px 0;">{{ selectItems?.wbcMemo }}</td>
              </tr>
              </tbody>
            </table>

            <!-- Print List -->
            <ul class="print" style="list-style: none; padding-left: 0; margin-top: 20px; text-align: center; display:flex; flex-direction: column; align-items: center; justify-content: center;">
              <li v-for="(item) in wbcInfo" :key="item.id" style="">
                <div style="font-weight: bold; font-size: 18px; margin: 40px auto 20px;">{{ item?.title }} ({{ item?.count }})</div>
                <ul :class="'wbcImgWrap ' + item?.title" style="list-style: none; padding-left: 0; margin-top: 10px;">
                  <li v-for="(image) in item.images" :key="image.fileName" style="display: inline-block; margin-right: 4px; margin-top: 4px; outline: 1px solid #2c2d2c; cursor: auto;">
                    <div style="position: relative;">
                      <img :src="getImageUrl(image.fileName, item.id, item.title)" :width="image.width ? image.width : '150px'" :height="image.height ? image.height : '150px'" :style="{ filter: image.filter }" class="cellImg" ref="cellRef"/>
                      <div class="center-point" :style="image.coordinates"></div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, ref } from "vue";
import {getTestTypeText} from "@/common/lib/utils/conversionDataUtils";
import {getImagePrintApi, getOrderClassApi} from "@/common/api/service/setting/settingApi";
import {useStore} from "vuex";
import pako from 'pako';
import {formatDateString} from "@/common/lib/utils/dateUtils";
import {detailRunningApi} from "@/common/api/service/runningInfo/runningInfoApi";
import {basicBmClassList, basicWbcArr} from "@/store/modules/analysis/wbcclassification";

const props = defineProps(['printOnOff', 'selectItemWbc']);
const apiBaseUrl = window.APP_API_BASE_URL || 'http://192.168.0.131:3002';
const store = useStore();

const printContent = ref(null);
const wbcInfo = ref([]);
const wbcInfoImg = ref([]);

const iaRootPath = computed(() => store.state.commonModule.value.iaRootPath);
const selectedSampleId = computed(() => store.state.commonModule.selectedSampleId);
const selectItems = ref<any>(null);
const orderClass = ref<any>({});

const imagePrintAndWbcArr = ref<string[]>([]);
const emit = defineEmits(['printClose']);
const nonWbcIdList = ['12', '13', '14', '15', '16'];

onMounted(async () => {
  await getDetailRunningInfo();
  wbcInfo.value = typeof props.selectItemWbc === 'object' ? props.selectItemWbc : JSON.parse(props.selectItemWbc);
  await getOrderClass();
  await getImagePrintData();
  await printPage();
});


const getOrderClass = async () => {
  try {
    const result = await getOrderClassApi();
    if (result) {
      if (result?.data.length === 0) {
        orderClass.value = [];
      } else {
        orderClass.value = result.data.sort((a: any, b: any) => Number(a.orderIdx) - Number(b.orderIdx));
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const getDetailRunningInfo = async () => {
  try {
    const result: any = await detailRunningApi(String(selectedSampleId.value));
    selectItems.value = result.data;
  } catch (e) {
    console.log(e);
  }
}

const filteredWbcInfo = computed(() => {
  return wbcInfo.value.filter((item: any) => !nonWbcIdList.includes(item.id) && item.count > 0);
});

function getImageUrl(imageName: any, id: string, title: string): string {
  // 이미지 정보가 없다면 빈 문자열 반환
  if (!wbcInfo.value || wbcInfo.value.length === 0) {
    return "";
  }

  // 해당 iaRootPath가 문제!
  const path = selectItems.value.img_drive_root_path !== '' && selectItems.value.img_drive_root_path ? selectItems.value.img_drive_root_path : iaRootPath.value;
  const slotId = selectItems.value.slotId || "";
  const folderPath = window.PROJECT_TYPE === 'bm' ? `${path}/${slotId}/04_BM_Classification/${id}_${title}` : `${path}/${slotId}/01_WBC_Classification/${id}_${title}`;
  return `${apiBaseUrl}/images/print?folder=${folderPath}&imageName=${imageName}`;
}


const printPage = async () => {
  try {
    // 프린트할 컨텐츠를 가져옴
    const content = printContent.value;
    if (!content) {
      throw new Error("프린트할 내용을 찾을 수 없습니다.");
    }

    // HTML 컨텐츠를 Gzip으로 압축
    const compressedContent = pako.gzip(content.innerHTML, { level: 9 });

    // HTML 컨텐츠를 PDF로 변환하는 요청을 보냄
    const response = await fetch(`${apiBaseUrl}/pdf/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
      },
      body: compressedContent
    });

    if (!response.ok) {
      throw new Error('HTML을 PDF로 변환하는데 실패했습니다.');
    }

    // 받은 PDF 파일을 브라우저의 PDF 뷰어로 열기
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank', 'width=800,height=500,noopener,noreferrer');
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error:', error);
  }
};



const getImagePrintData = async () => {
  try {
    const result = await getImagePrintApi();

    if (result && result.data) {
      const data = result.data;

      if (!data || (data instanceof Array && data.length === 0)) {
        console.log(null);
      } else {
        imagePrintAndWbcArr.value = data.filter((item) => item.checked).map(item => item.classId);

        // 이미지 프린트 및 wbc 배열에 없는 아이디 제거
        wbcInfo.value = wbcInfo.value.filter((item: any) => imagePrintAndWbcArr.value.includes(item.id));

        // count가 없는 경우 print에서 보여줄 wbcInfo에서 제거
        wbcInfo.value = wbcInfo.value.filter((item: any) => item.count !== '0');

        // wbcClassification Order 적용
        const oArr = orderClass.value.sort((a: any, b: any) => Number(a.orderIdx) - Number(b.orderIdx));
        const sortArr = orderClass.value.length !== 0 ? oArr : window.PROJECT_TYPE === 'bm' ? basicBmClassList : basicWbcArr;
        await sortWbcInfo(wbcInfo.value, sortArr);

      }
    }
  } catch (e) {
    console.error(e);
  }
};

const sortWbcInfo = (wbcInfo: any, basicWbcArr: any) => {
  let newSortArr = wbcInfo.slice(); // 기존 배열 복사

  newSortArr.sort((a: any, b: any) => {
    const nameA = basicWbcArr.findIndex((item: any) => (item.title || item.abbreviation) === (a.title || a.abbreviation));
    const nameB = basicWbcArr.findIndex((item: any) => (item.title || item.abbreviation) === (b.title || b.abbreviation));

    // 이름이 없는 경우는 배열 맨 뒤로 배치
    if (nameA === -1) return 1;
    if (nameB === -1) return -1;

    return nameA - nameB;
  });

  // 정렬된 배열을 wbcInfo에 할당
  wbcInfo.splice(0, wbcInfo.length, ...newSortArr);
};

const closePrint = () => {
  emit('printClose');
}

</script>
