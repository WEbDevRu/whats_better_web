import React, { createContext, ReactElement, useContext, useEffect, useState, } from 'react';
import { IRequest, IResponse, useRequest } from '../hooks/useRequest';
import { API_CATEGORIES_CATEGORY, API_CATEGORIES_LIST, } from '../const/http/API_URLS';
import { RequestMethods, RequestStatuses } from '../const/http';
import { CategoryPaginate } from '../types/categories';

interface IContext {
    onAddCategory: (data:IRequest) => Promise<Record<string, any>>,
    onLoadCategoriesList: (data:IRequest) => Promise<Record<string, any>>,
    categories: CategoryPaginate,
    onDeleteCategory: (data:IRequest) => Promise<Record<string, any>>
};

const CategoriesContext = createContext({} as IContext);
export const useCategories = () => useContext(CategoriesContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const CategoriesProvider = (props:PropsInterface) => {
    const { children } = props;
    const [categories, setCategories] = useState<
        CategoryPaginate
    >({
        items: [],
        totalItems: 0,
        limit: 0,
        page: 0,
        isInit: false,
        isFetching: true,
    });

    const {
        onRequest: onAddCategory,
        state: addCategoryResponse,
    } = useRequest({
        url: API_CATEGORIES_CATEGORY,
        method: RequestMethods.Post,
    });
    
    const { 
        onRequest: onLoadCategoriesList, 
        state: loadCategoriesListRS,
    } = useRequest({
        url: API_CATEGORIES_LIST,
        method: RequestMethods.Get 
    });

    const {
        onRequest: onDeleteCategory,
        state: deleteCategoryRS,
    } = useRequest({
        url: API_CATEGORIES_CATEGORY,
        method: RequestMethods.Delete
    });

    useEffect(() => {
        if (loadCategoriesListRS.status === RequestStatuses.Succeeded) {
            setCategories({
                items: loadCategoriesListRS.result.items,
                totalItems: loadCategoriesListRS.result.totalItems,
                page: loadCategoriesListRS.result.page,
                limit: loadCategoriesListRS.result.limit,
                isInit: true,
                isFetching: false,
            });
        }
    }, [loadCategoriesListRS.status]);

    return (
        <CategoriesContext.Provider
            value={{
                onAddCategory,
                onLoadCategoriesList,
                categories,
                onDeleteCategory,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};
