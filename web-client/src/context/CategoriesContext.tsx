import React, {
    createContext,
    ReactElement,
    useContext,
} from 'react';
import { IRequest, useRequest, IResponse } from '../hooks/useRequest';
import { API_CATEGORIES_CATEGORY } from '../const/http/API_URLS';
import { RequestMethods } from '../const/http';

interface IContext {
    onAddCategory: (data:IRequest) => Promise<IResponse>
};

const CategoriesContext = createContext({} as IContext);
export const useCategories = () => useContext(CategoriesContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const CategoriesProvider = (props:PropsInterface) => {
    const { children } = props;

    const {
        onRequest: onAddCategory,
        state: addCategoryResponse,
    } = useRequest({
        url: API_CATEGORIES_CATEGORY,
        method: RequestMethods.Post,
    });

    return (
        <CategoriesContext.Provider
            value={{
                onAddCategory,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};
