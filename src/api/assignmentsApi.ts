import type {AxiosInstance } from "axios";
import type { AssignmentListResponse, AssignmentLookupModel } from "../models/assignments/getAssignments";
import { apiRoutes } from "../constants/apiRoutes";
import type { AssignmentDetailsResponse } from "../models/assignments/getAssignmentDetails";

export async function getAssignments (axios: AxiosInstance, courseId: string) : Promise<AssignmentLookupModel[]>{
    const response = await axios.get<AssignmentListResponse>(apiRoutes.assignments.getAssignments(courseId));
    return response.data.assignments ?? [];
}

export async function getAssignmentDetails(axios:AxiosInstance, courseId: string, assignmentId: string) :Promise<AssignmentDetailsResponse> {
    const response = await axios.get<AssignmentDetailsResponse>(apiRoutes.assignments.getAssignmentDetails(courseId, assignmentId));
    return response.data;
    
}