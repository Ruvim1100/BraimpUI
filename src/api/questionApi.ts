import type { AxiosInstance } from "axios";
import { apiRoutes } from "../constants/apiRoutes";
import type { QuizQuestionListResponse, QuizQuestionLookupModel } from "../models/questions/getQuestionList";

export async function getQuizQuestions(axios: AxiosInstance, courseId: string, quizId: string) : Promise<QuizQuestionLookupModel[]> {
    const response = await axios.get<QuizQuestionListResponse>(apiRoutes.questions.getQuestions(courseId, quizId));
    return response.data.questions  ?? [];
}