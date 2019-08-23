export interface Task {
    id?: number;
    title: string;
    description: string;
    status?: TaskStatus;
    userId?: number;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export interface TaskFilter {
    status?: TaskStatus;
    search?: string;
}
