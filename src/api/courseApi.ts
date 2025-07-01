import type { AxiosInstance } from "axios";
import type { EnrolledCourseListResponse, GetEnrolledCourseListParams } from "../models/courses/getEnrolledCourses";
import type { CourseListResponse, GetCourseListParams } from "../models/courses/getPagedCourses";
import { apiRoutes } from "../constants/apiRoutes";
import type { GetOwnedCourseListParams, OwnedCourseListResponse } from "../models/courses/getOwnedCourses";

export const getEnrolledCourses = async (axios: AxiosInstance, params: GetEnrolledCourseListParams) : Promise<EnrolledCourseListResponse> => {
    const response = await axios.get<EnrolledCourseListResponse>(apiRoutes.courses.getEnrolled, {params});
    return response.data;
}

export const getOwnedCourses = async(axios: AxiosInstance, params: GetOwnedCourseListParams) : Promise<OwnedCourseListResponse> => {
    const response = await axios.get<OwnedCourseListResponse>(apiRoutes.courses.getOwned, {params});
    return response.data;
}

export const getAllCourses = async(axios: AxiosInstance, params: GetCourseListParams) : Promise<CourseListResponse> => {
    const response = await axios.get<CourseListResponse>(apiRoutes.courses.getAllCourses, {params});
    return response.data;
}
