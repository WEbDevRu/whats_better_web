export interface IComparisonEntityCategory {
    id?: string,
    title: string,
    description?: string,
    createdAt?: string,
    updatedAt?: string,
}

interface IIsFetching {
    isFetching: boolean,
}

export interface IComparisonEntityCategoryPaginateItem extends IComparisonEntityCategory, IIsFetching {}

export interface IComparisonEntityCategoryPaginate {
    items: IComparisonEntityCategoryPaginateItem[],
    totalItems: number | undefined,
    limit: number | undefined,
    page: number | undefined,
    isInit: boolean,
    isFetching: boolean,
}

export interface ILoadComparisonEntitiesCategories {
    limit: number,
    page: number,
}

export interface IDeleteComparisonEntityCategory {
    comparisonEntityCategoryId: string,
}

export interface IEditComparisonEntityCategory {
    comparisonEntityCategoryId: string,
    title: string,
    description?: string
}

export interface IAddComparisonEntityCategory {
    title: string,
    description?: string
}