export type Status = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export interface Task { _id:string; title:string; description:string; status:Status; priority:Priority; dueDate:string|null; createdAt:string; updatedAt:string; }
export interface User { id:string; name:string; email:string; }