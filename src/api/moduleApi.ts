import type { AxiosInstance } from "axios";
import type { PublishedModuleListResponse, PublishedModuleLookupModel } from "../models/modules/getModules";
import { apiRoutes } from "../constants/apiRoutes";

export async function getPublishedModules(axios:AxiosInstance, courseId: string) : Promise<PublishedModuleLookupModel[]> {
    const response = await axios.get<PublishedModuleListResponse>(apiRoutes.modules.getPublishedModules(courseId));
    return response.data.modules ?? [];
}