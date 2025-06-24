export interface CourseLookupModel {
  id: string;
  title: string;
  description?: string;
  thumbnailImage?: string;
}

export interface CourseListResponse {
  items: CourseLookupModel[];
  page: number;
  pageSize: number;
  query: string;
  totalCount: number;
  totalPages: number;
}

export interface GetCourseListParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  category?: string;
  sortBy?: string;
  descending?: boolean;
}
