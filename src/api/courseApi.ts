import type { AxiosInstance } from "axios";
import type { CourseLookupModel, EnrolledCourseListResponse } from "../models/courses/getEnrolledCourses";
import type { CourseListResponse, GetCourseListParams } from "../models/courses/getPagedCourses";
import { apiRoutes } from "../constants/apiRoutes";

export const getEnrolledCourses = async (axios: AxiosInstance) : Promise<CourseLookupModel[]> => {
    const response = await axios.get<EnrolledCourseListResponse>(apiRoutes.courses.getEnrolled);
    return  response.data.courses;
}

export const getAllCourses = async(axios: AxiosInstance, params: GetCourseListParams) : Promise<CourseListResponse> => {
    const response = await axios.get<CourseListResponse>(apiRoutes.courses.getAllCourses, {params});
    return response.data;
}