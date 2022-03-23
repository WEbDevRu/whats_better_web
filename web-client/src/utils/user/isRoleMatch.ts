import { UserRole } from '../../const/user/USER_ROLES';

export const isRoleMatch = (
    checkedRole: UserRole | undefined,
    acceptedRoles: UserRole | UserRole[] | undefined,
):boolean => {
    if (checkedRole && Array.isArray(acceptedRoles)) {
        return acceptedRoles.includes(checkedRole);
    }
    return acceptedRoles === checkedRole;
};
