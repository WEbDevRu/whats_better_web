import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import {
    IComparisonEntityCategoryPaginate,
    ILoadComparisonEntitiesCategories,
    IDeleteComparisonEntityCategory,
    IEditComparisonEntityCategory,
    IAddComparisonEntityCategory,
} from '../types/comparisonEntity';

import { useRequest } from '../hooks/useRequest';
import { API_COMPARISON_ENTITIES } from '../const/http/API_URLS';
import { RequestMethods } from '../const/http';
import { PAGINATION_PAGE_SIZE } from '../component/AdminPanel/Categories/Categories';

interface IContext {
    entityCategoriesPaginate: IComparisonEntityCategoryPaginate,
    onLoadEntitiesCategories: (data:ILoadComparisonEntitiesCategories) => void,
    onAddEntityCategory: (data:IAddComparisonEntityCategory) => void,
    onEditEntityCategory: (data:IEditComparisonEntityCategory) => void,
    onDeleteEntityCategory: (data:IDeleteComparisonEntityCategory) => void,
};

const ComparisonEntityContext = createContext({} as IContext);
export const useComparisonEntity = () => useContext(ComparisonEntityContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const ComparisonEntityProvider = (props:PropsInterface) => {
    const { children } = props;
    const [entityCategoriesPaginate, setIntityCategoriesPaginate] = useState<IComparisonEntityCategoryPaginate>({
        items: [],
        totalItems: undefined,
        limit: undefined,
        page: undefined,
        isInit: false,
        isFetching: false,
    });

    const {
        onRequest: onRequestEntitiesCategoriesList,
        state: entitiesCategoriesResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITIES,
        method: RequestMethods.Get
    });

    const {
        onRequest: onAddEntitiesCategory,
        state: addEntitiesCategoryResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITIES,
        method: RequestMethods.Post
    });

    const {
        onRequest: onEditEntitiesCategory,
        state: editEntitiesCategoryResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITIES,
        method: RequestMethods.Put
    });

    const {
        onRequest: onDeleteEntitiesCategory,
        state: deleteEntitiesCategoryResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITIES,
        method: RequestMethods.Delete
    });

    useEffect(() => {

    }, []);

    const onAddEntityCategory = (data:IAddComparisonEntityCategory) => {

    };

    const onEditEntityCategory = (data:IEditComparisonEntityCategory) => {

    };

    const onDeleteEntityCategory = (data:IDeleteComparisonEntityCategory) => {

    };

    const onLoadEntitiesCategories = (data:ILoadComparisonEntitiesCategories) => {
        onRequestEntitiesCategoriesList({
            params: {
                page: data.page,
                limit: data.limit,
            }
        });
        setIntityCategoriesPaginate((c) => ({
            ...c,
            isFetching: true,
        }));
    };


    return (
        <ComparisonEntityContext.Provider
            value={{
                entityCategoriesPaginate,
                onLoadEntitiesCategories,
                onAddEntityCategory,
                onEditEntityCategory,
                onDeleteEntityCategory,
            }}
        >
            {children}
        </ComparisonEntityContext.Provider>
    );
};
