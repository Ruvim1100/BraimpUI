export interface QuizDetailsResponse{
    id: string,
    title: string,
    description?: string,
    timeLimitMinutes?: number,
    maxAttempts: number,
    idRandomized: boolean,
    availableFrom: Date,
    availableUntil: Date,
}