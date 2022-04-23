import React, { createContext, ReactElement, useContext } from 'react';

interface IContext {

};

const ComparisonEntityContext = createContext({} as IContext);
export const useComparisonEntity = () => useContext(ComparisonEntityContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const ComparisonEntityProvider = (props:PropsInterface) => {
    const { children } = props;


    return (
        <ComparisonEntityContext.Provider
            value={{

            }}
        >
            {children}
        </ComparisonEntityContext.Provider>
    );
};
