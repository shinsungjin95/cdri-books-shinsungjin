import type {ComponentType} from "react";

export type ModalAction<T = unknown> = (
    data?: T
) => boolean | void;

export interface ModalOptions {
    width?: number | string;
    maxHeight?: number | string;
    title?: string;
    closeBtn?: boolean;
    message?: string;
    cancelText?: string;
    confirmText?: string;
    modalClassName?: string;
    zIndex?: number;
    position?: ModalPosition;
}

export interface ModalContentProps extends ModalOptions {
    modalDepth?: number;
    onConfirm?: ModalAction;
    onCancel?: ModalAction;
    [key: string]: unknown;
}

export interface ModalProps extends ModalContentProps {
    id: string;
    idx: number;
    type: string;
    component?: ComponentType<ModalContentProps>;
}

export interface ModalItem {
    type: string;
    component?: ComponentType<ModalContentProps>;
    props?: ModalContentProps;
}

export interface ModalStateItem {
    id: string;
    type: string;
    props: ModalOptions;
}

export interface ModalRegistryItem {
    component?: ComponentType<ModalContentProps>;
    props?: ModalContentProps;
}

export interface ModalPosition {
    top: number;
    left: number;
    right: number;
}