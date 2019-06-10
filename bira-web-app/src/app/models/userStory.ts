import { State } from './state';

export interface UserStory {
    uid: string;
    description: string;
    tasks: any;
    files: string;
    name: string;
    responsible: string;
    state: State;
}
