import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import {
    IAddComparisonEntityCategory,
    IComparisonEntityCategory,
    IComparisonEntityCategoryPaginate,
    IDeleteComparisonEntityCategory,
    IEditComparisonEntityCategory,
    ILoadComparisonEntitiesCategories,
    IComparisonEntityCategoryPaginateItem,
    IComparisonEntityPaginate,
    ILoadComparisonEntities,
} from '../types/comparisonEntity';

import { useRequest } from '../hooks/useRequest';
import {
    API_COMPARISON_ENTITIES_CATEGORIES,
    API_COMPARISON_ENTITY,
} from '../const/http/API_URLS';
import { RequestMethods, RequestStatuses } from '../const/http';

interface IContext {
    entityCategoriesPaginate: IComparisonEntityCategoryPaginate,
    onLoadEntitiesCategories: (data:ILoadComparisonEntitiesCategories) => void,
    onAddEntityCategory: (data:IAddComparisonEntityCategory) => void,
    onEditEntityCategory: (data:IEditComparisonEntityCategory) => void,
    onDeleteEntityCategory: (data:IDeleteComparisonEntityCategory) => void,
    onLoadEntities: (data:ILoadComparisonEntities) => void,
};

const ComparisonEntityContext = createContext({} as IContext);
export const useComparisonEntity = () => useContext(ComparisonEntityContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const ComparisonEntityProvider = (props:PropsInterface) => {
    const { children } = props;
    const [entityCategoriesPaginate, setEntityCategoriesPaginate] = useState<IComparisonEntityCategoryPaginate>({
        items: [],
        totalItems: undefined,
        limit: undefined,
        page: undefined,
        isInit: false,
        isFetching: false,
    });

    const [entityPaginate, setEntityPaginate] = useState<IComparisonEntityPaginate>({
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
        url: API_COMPARISON_ENTITIES_CATEGORIES,
        method: RequestMethods.Get
    });

    const {
        onRequest: onAddEntitiesCategory,
        state: addEntitiesCategoryResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITIES_CATEGORIES,
        method: RequestMethods.Post
    });

    const {
        onRequest: onDeleteEntitiesCategory,
        state: deleteEntitiesCategoryResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITIES_CATEGORIES,
        method: RequestMethods.Delete
    });

    const {
        onRequest: onAddEntityRequest,
        state: addEntityResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITY,
        method: RequestMethods.Post
    });

    const {
        onRequest: onLoadEntitiesRequest,
        state: loadEntitiesResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITY,
        method: RequestMethods.Get
    });

    const onAddEntityCategory = (data:IAddComparisonEntityCategory) => {
        onAddEntitiesCategory({
            data: {
                name: data.title,
                description: data.description,
            }
        });
    };

    const onEditEntityCategory = (data:IEditComparisonEntityCategory) => {

    };

    const onDeleteEntityCategory = (data:IDeleteComparisonEntityCategory) => {
        onDeleteEntitiesCategory({
            id: data.comparisonEntityCategoryId,
        });

        setEntityCategoriesPaginate((c) => {
            const itemIndex = c.items.findIndex((item) => item.id === data.comparisonEntityCategoryId);
            if (itemIndex !== -1) {
                const currentCopy = { ...c };
                currentCopy.items[itemIndex].isFetching = true;
                return  currentCopy;
            };

            return c;
        });
    };

    const onLoadEntitiesCategories = (data:ILoadComparisonEntitiesCategories) => {
        onRequestEntitiesCategoriesList({
            params: {
                page: data.page,
                limit: data.limit,
            }
        });
        setEntityCategoriesPaginate((c) => ({
            ...c,
            isFetching: true,
        }));
    };

    const onLoadEntities = (data:ILoadComparisonEntities) => {
        onLoadEntitiesRequest({
            params: {
                page: data.page,
                limit: data.limit,
            }
        });
    };

    useEffect(() => {
        if (entitiesCategoriesResponse.status === RequestStatuses.Succeeded) {
            setEntityCategoriesPaginate({
                items: entitiesCategoriesResponse.result.items?.map((item:IComparisonEntityCategory) => ({ ...item, isFetching: false })),
                totalItems: entitiesCategoriesResponse.result.totalItems,
                limit: entitiesCategoriesResponse.result.limit,
                page: entitiesCategoriesResponse.result.page,
                isInit: true,
                isFetching: true,
            });
        }
    }, [entitiesCategoriesResponse.status]);

    useEffect(() => {
        if (deleteEntitiesCategoryResponse.status === RequestStatuses.Succeeded) {
            setEntityCategoriesPaginate((c) => {
                const itemIndex = c.items.findIndex((item) => item.id === deleteEntitiesCategoryResponse.result.id);
                if (itemIndex !== -1) {
                    const currentCopy = { ...c };
                    currentCopy.items.splice(itemIndex, 1);
                    return {
                        ...currentCopy,
                        totalItems: c.totalItems ? c?.totalItems - 1 : 0
                    };
                };

                return c;
            });
        }
    }, [deleteEntitiesCategoryResponse.status]);

    useEffect(() => {
        if (addEntitiesCategoryResponse.status === RequestStatuses.Succeeded) {
            setEntityCategoriesPaginate((c) => {
                const currentCopy = { ...c };

                const newItem = { ...addEntitiesCategoryResponse.result, isFetching: false } as IComparisonEntityCategoryPaginateItem;
                currentCopy.items = [newItem, ...currentCopy.items];

                return {
                    ...currentCopy,
                    totalItems: c.totalItems ? c?.totalItems + 1 : 1
                };
            });
        }
    }, [addEntitiesCategoryResponse.status]);


    return (
        <ComparisonEntityContext.Provider
            value={{
                entityCategoriesPaginate,
                onLoadEntitiesCategories,
                onAddEntityCategory,
                onEditEntityCategory,
                onDeleteEntityCategory,
                onLoadEntities,
            }}
        >
            {children}
        </ComparisonEntityContext.Provider>
    );
};
