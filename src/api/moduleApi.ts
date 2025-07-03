import type { AxiosInstance } from "axios";
import type { PublishedModuleListResponse, PublishedModuleLookupModel } from "../models/modules/getPublishedModules";
import { apiRoutes } from "../constants/apiRoutes";
import type { ModuleListResponse, ModuleLookupModel } from "../models/modules/getModules";

export async function getPublishedModules(axios:AxiosInstance, courseId: string) : Promise<PublishedModuleLookupModel[]> {
    const response = await axios.get<PublishedModuleListResponse>(apiRoutes.modules.getPublishedModules(courseId));
    return response.data.modules ?? [];
}

export async function getModules(axios: AxiosInstance, courseId: string) : Promise<ModuleLookupModel[]>{
    const response = await axios.get<ModuleListResponse>(apiRoutes.modules.getModules(courseId));
    return response.data.modules ?? [];
}