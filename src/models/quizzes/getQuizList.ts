export interface PublishedQuizLookupModel{
    id: string,
    title: string,
    maxAttempts: number,
    availableFrom?: Date,
    availableUntil?: Date
}

export interface PublishedQuizListResponse{
    quizzes: PublishedQuizLookupModel[]
}