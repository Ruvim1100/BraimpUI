export interface QuestionOptionModel{
    id: string,
    text: string,
    isCorrect: boolean
}

export type QuestionType = 'SingleChoice' | 'MultipleChoice' | 'Text'; 

export interface QuizQuestionLookupModel{
    id: string,
    text: string,
    questionType: QuestionType,
    weight: number,
    file: string,
    questionOptionModels?: QuestionOptionModel[]
}

export interface QuizQuestionListResponse{
    questions: QuizQuestionLookupModel[]
}