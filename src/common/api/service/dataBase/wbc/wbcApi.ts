import {ApiResponse, useHttpClient} from "@/common/api/httpClient";
import {apiConstants} from "@/common/api/apiConstants";
const httpClient = useHttpClient();

export const moveImgPost = async (request: any): Promise<ApiResponse<void>> => {
    return httpClient.httpGet(apiConstants.images.move, request , true);
};