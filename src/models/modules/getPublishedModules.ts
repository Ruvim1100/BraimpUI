export interface PublishedModuleLookupModel {
  id: string;
  title: string;
  description?: string;
  sortIndex: number;
  lessonCount: number;
}

export interface PublishedModuleListResponse {
  modules: PublishedModuleLookupModel[];
}
