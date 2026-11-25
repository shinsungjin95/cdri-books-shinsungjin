import {useAppDispatch} from "@/redux/hook";
import {openModal, closeModal, closeModalById, closeAllModal} from "@/redux/slice/modalSlice";
import type {ModalItem, ModalOptions, ModalRegistryItem} from "./types";
import {nanoid} from "@reduxjs/toolkit";

const modalRegistry: Record<string, ModalRegistryItem> = {};

export const registerModal = (id: string, item: ModalRegistryItem): void => {
    modalRegistry[id] = item;
};

export const getModal = (id: string): ModalRegistryItem | undefined => {
    return modalRegistry[id];
};

export const unregisterModal = (id: string): void => {
    delete modalRegistry[id];
};

export const useModal = () => {
    const dispatch = useAppDispatch();

    const callModal = ({ type, component, props = {} }: ModalItem) => {
        const id = nanoid();
        const options: ModalOptions = {
            width: props.width,
            maxHeight: props.maxHeight,
            title: props.title,
            closeBtn: props.closeBtn,
            message: props.message,
            cancelText: props.cancelText,
            confirmText: props.confirmText,
            modalClassName: props.modalClassName,
            zIndex: props.zIndex,
            position: props.position,
        };

        registerModal(id, {
            component,
            props,
        });

        dispatch(
            openModal({
                id,
                type,
                props: options,
            })
        );

        return id;
    };

    const close = () => {
        dispatch(closeModal());
    };

    const closeById = (id: string) => {
        dispatch(closeModalById(id));
    };

    const closeAll = () => {
        dispatch(closeAllModal());
    };

    return {
        callModal,
        close,
        closeById,
        closeAll,
    };
};