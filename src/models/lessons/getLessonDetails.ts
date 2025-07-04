export interface FileResourceModel{
    id: string,
    name: string,
    downloadUrl: string
}

export interface LessonDetailsResponse
{
    id: string,
    title: string,
    description?: string,
    isPublished: boolean,
    sortIndex: number,
    files: FileResourceModel[]
}