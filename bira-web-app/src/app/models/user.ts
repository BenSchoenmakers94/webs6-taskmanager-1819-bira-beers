import { Timestamp } from 'rxjs';

export interface User {
    uid: string;
    description: string;
    email: string;
    firstName: string;
    lastName: string;
    teams: string[];
    userName: string;
    birthDate: Date;
}
