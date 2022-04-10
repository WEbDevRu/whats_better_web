export interface Category {
    id?: string,
    title?: string,
    description?: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface CategoryPaginate {
    items: Category[],
    totalItems: number,
    limit: number,
    page: number,
    isInit: boolean,
    isFetching: boolean,
}