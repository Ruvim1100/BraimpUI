import type { AxiosInstance } from "axios";
import type { AssignmentListResponse, AssignmentLookupModel } from "../models/assignments/getAssignments";
import { apiRoutes } from "../constants/apiRoutes";

export async function getAssignments (axios: AxiosInstance, courseId: string) : Promise<AssignmentLookupModel[]>{
    const response = await axios.get<AssignmentListResponse>(apiRoutes.assignments.getAssignments(courseId));
    return response.data.assignments ?? [];
}