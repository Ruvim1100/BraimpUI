export interface PublishedLessonLookupModel{
    id: string,
    title: string,
    description?: string,
    createdAt: string,
    sortIndex: number
}  

export interface PublishedLessonListResponse{
    lessons: PublishedLessonLookupModel[]
}