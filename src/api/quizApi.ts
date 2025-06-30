import type { AxiosInstance } from "axios";
import type { PublishedQuizListResponse, PublishedQuizLookupModel } from "../models/quizzes/getQuizList";
import { apiRoutes } from "../constants/apiRoutes";

export async function getPublishedQuizzes(axios: AxiosInstance, courseId: string) : Promise<PublishedQuizLookupModel[]> {
    const response = await axios.get<PublishedQuizListResponse>(apiRoutes.quizzes.getPublishedQuizzes(courseId));
    return response.data.quizzes ?? [];
}