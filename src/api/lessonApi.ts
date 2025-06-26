import type { AxiosInstance } from "axios";
import type {PublishedLessonListResponse, PublishedLessonLookupModel } from "../models/lessons/getPublishedLessons";
import { apiRoutes } from "../constants/apiRoutes";

export async function getPublishedLessons(axios: AxiosInstance, courseId: string, moduleId: string) : Promise<PublishedLessonLookupModel[]>{
    const response = await axios.get<PublishedLessonListResponse>(apiRoutes.lessons.getPublishedLessons(courseId, moduleId));
    return response.data.lessons ?? [];
    
}