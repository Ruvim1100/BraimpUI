import type { AxiosInstance } from "axios";
import type { PublishedQuizListResponse, PublishedQuizLookupModel } from "../models/quizzes/getQuizList";
import { apiRoutes } from "../constants/apiRoutes";
import type { QuizDetailsResponse } from "../models/quizzes/getQuizDetails";

export async function getPublishedQuizzes(axios: AxiosInstance, courseId: string) : Promise<PublishedQuizLookupModel[]> {
    const response = await axios.get<PublishedQuizListResponse>(apiRoutes.quizzes.getPublishedQuizzes(courseId));
    return response.data.quizzes ?? [];
}

export async function getQuizDetails(axios: AxiosInstance, courseId: string, quizId: string) : Promise<QuizDetailsResponse> {
    const response = await axios.get<QuizDetailsResponse>(apiRoutes.quizzes.getQuizDetails(courseId, quizId))
    return response.data ?? [];
    
}