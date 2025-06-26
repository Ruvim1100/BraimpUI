import type { AxiosInstance } from "axios";
import type { ModuleListResponse, ModuleLookupModel } from "../models/modules/getModules";
import { apiRoutes } from "../constants/apiRoutes";

export async function getPublishedModules(axios:AxiosInstance, courseId: string) : Promise<ModuleLookupModel[]> {
    const response = await axios.get<ModuleListResponse>(apiRoutes.modules.getPublishedModules(courseId));
    return response.data.modules ?? [];
}