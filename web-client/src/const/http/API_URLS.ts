export const API_ROOT = '/api/v1';
export const API_ADMIN = `${API_ROOT}/admin`;
export const API_CATEGORIES = `${API_ROOT}/categories`;
export const API_ADMIN_AUTH = `${API_ADMIN}/auth`;

export const API_AUTH_ADMIN_ME = `${API_ADMIN_AUTH}/me`;

export const API_CATEGORIES_CATEGORY = `${API_CATEGORIES}/category`;
export const API_CATEGORIES_LIST = `${API_CATEGORIES}/categories`;
export const API_CATEGORY_SEARCH = `${API_CATEGORIES}/search`;

export const API_COMPARISON_ENTITIES_CATEGORIES = ({ id }: { id?: string })  =>
    `${API_ROOT}/comparison-entities-categories${id ? `/${id}` : ''}`;

export const API_COMPARISON_ENTITIES_CATEGORY_SEARCH = `${API_ROOT}/comparison-entities-categories/search`;

export const API_COMPARISON_ENTITY = ({ id }: { id?: string })  =>
    `${API_ROOT}/comparison-entity${id ? `/${id}` : ''}`;

export const API_COMPARISON_ENTITY_SEARCH = `${API_ROOT}/comparison-entity/search`;

export const API_ADD_COMPARISON = `${API_ROOT}/comparison`;