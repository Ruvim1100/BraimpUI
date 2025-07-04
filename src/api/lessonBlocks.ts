import { type AxiosInstance } from "axios";
import { apiRoutes } from "../constants/apiRoutes";
import type { LessonBlockCreateParams } from "../models/lessonBlocks/createLessonBlock";
import type { LessonBlockListResponse, LessonBlockLookupModel } from "../models/lessonBlocks/getLessonBlocks";
import type { LessonBlockUpdateParams } from "../models/lessonBlocks/updateLessonBlock";
import type { LessonBlockDeleteParams } from "../models/lessonBlocks/deleteLessonBlock";

export async function createLessonBlock(axios: AxiosInstance, params: LessonBlockCreateParams) {
  const { courseId, moduleId, lessonId, blockType: type, content } = params;
  await axios.post(apiRoutes.lessonBlocks.createLessonBlock(courseId, moduleId, lessonId), {type, content});
}

export async function getLessonBlocks(axios: AxiosInstance, courseId: string, moduleId: string, lessonId: string) : Promise<LessonBlockLookupModel[]> {
  const response = await axios.get<LessonBlockListResponse>(apiRoutes.lessonBlocks.getLessonBlocks(courseId, moduleId, lessonId));
  return response.data.lessonBlocks ?? [];
}

export async function updateLessonBlock(axios: AxiosInstance, params: LessonBlockUpdateParams) {
  const { courseId, moduleId, lessonId, id, content } = params;
  await axios.put(apiRoutes.lessonBlocks.updateLessonBlocks(courseId, moduleId, lessonId, id), {content});
}

export async function deleteLessonBlock(axios: AxiosInstance, params: LessonBlockDeleteParams) {
  const { courseId, moduleId, lessonId, id } = params;
  await axios.delete(apiRoutes.lessonBlocks.deleteLessonBlocks(courseId, moduleId, lessonId, id));
}