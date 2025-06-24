export interface CourseLookupModel {
    id: string,
    title: string,
    description?: string,
    thumbnailImage?: string | null
}

export interface EnrolledCourseListResponse {
    courses: CourseLookupModel[]
}