import { useState, useCallback } from 'react';

export interface IModal {
    visible: boolean;
    confirmationLoading: boolean,
    onToggle: () => void;
    onShow: () => void;
    onClose: () => void;
    onToggleConfirmationLoading: () => void,
    onStartConfirmationLoading: () => void,
    onStopConfirmationLoading: () => void,
}

export const useModal = (defaultValue:{
    visible: boolean,
    confirmationLoading: boolean
} = {
    visible: false,
    confirmationLoading: false,
}): IModal => {
    const [modalState, setModalState] = useState<{
        visible: boolean,
        confirmationLoading: boolean,
    }>(defaultValue);

    const onToggle = useCallback(() => setModalState((s) => ({
        ...s,
        visible: !s.visible
    })), []);

    const onShow = useCallback(() => {
        setModalState((s) => ({
            ...s,
            visible: true
        }));
    }, []);
    const onClose = useCallback(() => {
        setModalState((s) => ({
            ...s,
            visible: false
        }));
    }
    , []);

    const onToggleConfirmationLoading = useCallback(() => setModalState((s) => ({
        ...s,
        confirmationLoading: !s.confirmationLoading
    })), []);

    const onStartConfirmationLoading = useCallback(() => {
        setModalState((s) => ({
            ...s,
            confirmationLoading: true
        }));
    }, []);
    const onStopConfirmationLoading = useCallback(() => {
        setModalState((s) => ({
            ...s,
            confirmationLoading: false
        }));
    }
    , []);

    return {
        visible: modalState.visible,
        confirmationLoading: modalState.confirmationLoading,
        onToggle,
        onShow,
        onClose,
        onToggleConfirmationLoading,
        onStartConfirmationLoading,
        onStopConfirmationLoading,
    };
};
