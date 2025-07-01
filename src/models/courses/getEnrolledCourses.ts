export interface EnrolledCourseLookupModel {
    id: string,
    title: string,
    description?: string,
    thumbnailImageUrl?: string | null
}

export interface EnrolledCourseListResponse {
      items: EnrolledCourseLookupModel[];
      page: number;
      pageSize: number;
      query: string;
      totalCount: number;
      totalPages: number;
}

export interface GetEnrolledCourseListParams {
  page?: number;
  pageSize?: number;
}
