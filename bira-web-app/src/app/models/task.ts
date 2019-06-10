import { State } from './state';

export interface Task {
    uid: string;
    name: string;
    description: string;
    state: State;
}
