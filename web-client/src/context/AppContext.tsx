import React, {
    createContext,
    useContext,
    ReactElement,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { IAppState } from '../types/app';

interface IContext {
    appState: IAppState | null,
    setAppState: Dispatch<SetStateAction<IAppState>>
};

const AppContext = createContext({} as IContext);
export const useApp = () => useContext(AppContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const AppProvider = (props:PropsInterface) => {
    const { children } = props;

    const [appState, setAppState] = useState<IAppState>({
        isInit: false,
        userRole: undefined,
    });

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
