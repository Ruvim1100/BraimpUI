
export interface AssignmentFileModel{
    fileName: string,
    downloadUrl: string
}

export interface AssignmentDetailsResponse{
    id: string,
    title: string,
    description?: string,
    deadline: Date
    assignmentFiles: AssignmentFileModel[]
}