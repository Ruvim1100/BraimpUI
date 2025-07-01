export interface OwnedCourseLookupModel {
  id: string;
  title: string;
  description?: string;
  thumbnailImageUrl?: string;
}

export interface OwnedCourseListResponse {
  items: OwnedCourseLookupModel[];
  page: number;
  pageSize: number;
  query: string;
  totalCount: number;
  totalPages: number;
}

export interface GetOwnedCourseListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
}
