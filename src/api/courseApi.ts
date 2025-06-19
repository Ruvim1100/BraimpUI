import type { AxiosInstance } from "axios";
import type { Course } from "../models/courses/course";
import type { CourseListResponce } from "../models/courses/courseListResponse";

export const getEnrolledCourses = async (
  axios: AxiosInstance
): Promise<Course[]> => {
  const response = await axios.get<CourseListResponce>("/courses/enrolled");
  return response.data?.courses;
};

export const getAllCourses = async(
  axios: AxiosInstance
): Promise<Course[]> => {
  const response = await axios.get<CourseListResponce>("courses");
  return response.data?.courses;
}