export type Blocktype = "Text" | "Image" | "Code" | "Video";

export interface LessonBlockLookupModel{
    id: string,
    blockType: Blocktype,
    content: string,
    sortIndex: number
}

export interface LessonBlockListResponse{
    lessonBlocks: LessonBlockLookupModel[]
}