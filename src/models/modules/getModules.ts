export interface ModuleLookupModel {
  id: string;
  title: string;
  description?: string;
  sortIndex: number;
  lessonCount: number;
}

export interface ModuleListResponse {
  modules: ModuleLookupModel[];
}
