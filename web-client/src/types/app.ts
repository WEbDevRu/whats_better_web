import { UserRole } from '../const/user/USER_ROLES';

export interface IAppState {
    isInit: boolean,
    userRole: UserRole | undefined,
}