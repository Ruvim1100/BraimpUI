export interface CourseDetailsResponse{
    id: string,
    title: string,
    description?: string,
    status: string,
    gradingSystem: string,
    createdAt: string,
    thumbnailImageUrl?: string,
    bannerImageUrl?: string,
    courseCategory: string,
    tags: string[]
}