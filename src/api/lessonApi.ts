import type { AxiosInstance } from "axios";
import type {PublishedLessonListResponse, PublishedLessonLookupModel } from "../models/lessons/getPublishedLessons";
import { apiRoutes } from "../constants/apiRoutes";
import type { LessonDetailsResponse } from "../models/lessons/getLessonDetails";

export async function getPublishedLessons(axios: AxiosInstance, courseId: string, moduleId: string) : Promise<PublishedLessonLookupModel[]>{
    const response = await axios.get<PublishedLessonListResponse>(apiRoutes.lessons.getPublishedLessons(courseId, moduleId));
    return response.data.lessons ?? [];
    
}

export async function getLessonDetails(axios: AxiosInstance, courseId: string, moduleId: string, lessonId: string) : Promise<LessonDetailsResponse>{
    const response = await axios.get<LessonDetailsResponse>(apiRoutes.lessons.getLessonDetails(courseId, moduleId, lessonId));
    return response.data;
}