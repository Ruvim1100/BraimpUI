export interface AssignmentLookupModel{
    id: string,
    title: string,
    description: string,
    deadLine: Date,
}

export interface AssignmentListResponse{
    assignments: AssignmentLookupModel[]
}