import {Task, TaskFilter} from '../task.model';

export interface TasksState {
    allTasks: Task[];
    filteredTasks: Task[];
    filters: TaskFilter;
    error: any;
    loaded: boolean;
    loading; boolean;
}

export const initialState = {
    allTasks: null,
    filteredTasks: null,
    filters: null,
    error: null,
    loaded: false,
    loading: false,
};
