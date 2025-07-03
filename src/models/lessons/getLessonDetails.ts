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
    isPublished: string,
    sortIndex: number,
    files: FileResourceModel[]
}