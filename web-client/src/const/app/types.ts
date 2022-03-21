import { UserRole } from '../user/USER_ROLES';

export interface AppState {
    isInit: boolean,
    userRole: UserRole | undefined,
}