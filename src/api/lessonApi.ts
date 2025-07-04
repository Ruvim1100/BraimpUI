import type { AxiosInstance } from "axios";
import type {PublishedLessonListResponse, PublishedLessonLookupModel } from "../models/lessons/getPublishedLessons";
import { apiRoutes } from "../constants/apiRoutes";
import type { LessonDetailsResponse } from "../models/lessons/getLessonDetails";
import type { CreateLessonParams } from "../models/lessons/createLesson";
import type { DeleteLessonParams } from "../models/lessons/deleteLesson";

export async function getPublishedLessons(axios: AxiosInstance, courseId: string, moduleId: string) : Promise<PublishedLessonLookupModel[]>{
    const response = await axios.get<PublishedLessonListResponse>(apiRoutes.lessons.getPublishedLessons(courseId, moduleId));
    return response.data.lessons ?? [];
    
}

export async function getLessonDetails(axios: AxiosInstance, courseId: string, moduleId: string, lessonId: string) : Promise<LessonDetailsResponse>{
    const response = await axios.get<LessonDetailsResponse>(apiRoutes.lessons.getLessonDetails(courseId, moduleId, lessonId));
    return response.data;
}

export async function createLesson(axios: AxiosInstance, courseId: string, moduleId: string, params: CreateLessonParams) {
    const {title, description, isPublished} = params;
    await axios.post(apiRoutes.lessons.createLesson(courseId, moduleId), {title, description, isPublished});  
}

export async function deleteLesson(axios: AxiosInstance, params: DeleteLessonParams) {
    const {courseId, moduleId, id} = params;
    await axios.delete(apiRoutes.lessons.deleteLesson(courseId, moduleId, id));  
}