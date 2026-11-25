import SearchDetailBookModal from "@/common/components/Modal/items/SearchDetailBookModal";


import type {ModalItem, ModalContentProps} from "@/common/components/Modal/types";

export const MODAL_TYPE = {
    MODAL: "MODAL",
    CONFIRM: "CONFIRM",
};

interface ModalPayloadOptions {
    props?: ModalContentProps;
}

export const MODAL_PAYLOAD = {
    ERROR_CONFIRM: ({ props = {} }: ModalPayloadOptions = {}): ModalItem => ({
        type: MODAL_TYPE.CONFIRM,
        props: {
            width: 360,
            message: "오류가 발생했습니다.",
            confirmText: "확인",
            ...props,
        },
    }),
    SEARCH_DETAIL_BOOK_MODAL: ({ props = {} }: ModalPayloadOptions = {}): ModalItem => ({
        type: MODAL_TYPE.MODAL,
        component: SearchDetailBookModal,
        props: {
            width: 360,
            closeBtn: true,
            ...props,
        },
    }),
};