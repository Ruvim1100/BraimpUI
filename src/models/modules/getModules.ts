export interface LessonLookupModel {
    id: string,
    title: string,
    isPublished: boolean,
    sortIndex: number
}


export interface ModuleLookupModel {
  id: string;
  title: string;
  isPublished: boolean,
  sortIndex: number;
  lessons: LessonLookupModel[]
}

export interface ModuleListResponse {
  modules: ModuleLookupModel[];
}
