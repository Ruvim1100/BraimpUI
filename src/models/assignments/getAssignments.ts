export interface AssignmentLookupModel{
    id: string,
    title: string,
    description: string,
    deadline: Date,
}

export interface AssignmentListResponse{
    assignments: AssignmentLookupModel[]
}