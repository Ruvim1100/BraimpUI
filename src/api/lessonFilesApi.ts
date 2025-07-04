import type { AxiosInstance } from "axios";
import { apiRoutes } from "../constants/apiRoutes";
import type { CreateLessonFileParams } from "../models/lessonFiles/createLessonFile";
import type { DeleteLessonFileParams } from "../models/lessonFiles/deleteLessonFile";


export async function createLessonFile(axios: AxiosInstance, params: CreateLessonFileParams) {
  const { courseId, moduleId, lessonId, displayName, file } = params;

  const formData = new FormData();
  formData.append("displayName", displayName);
  formData.append("file", file); 

  await axios.post(
    apiRoutes.lessonFiles.createLessonFile(courseId, moduleId, lessonId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export async function deleteLessonFile(axios: AxiosInstance, params: DeleteLessonFileParams) {
  const {courseId, moduleId, lessonId, id} = params;
  await axios.delete(apiRoutes.lessonFiles.deleteLessonFile(courseId, moduleId, lessonId, id))
}