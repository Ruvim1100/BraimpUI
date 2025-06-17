import type { AxiosInstance } from "axios";
import type { Course } from "../models/courses/course";
import type { courseListResponce } from "../models/courses/courseListResponse";

export const getEnrolledCourses = async (
  axios: AxiosInstance
): Promise<Course[]> => {
  const response = await axios.get<courseListResponce>("/courses/enrolled");
  console.log(response.data);
  return response.data?.courses;
};
