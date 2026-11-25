import styled from "styled-components";
import {useAppDispatch} from "@/redux/hook";
import {closeModalById} from "@/redux/slice/modalSlice";
import type {ModalProps, ModalAction} from "./types";
import {ConfirmComponent } from "./style";
import Button from "@/common/components/Button";

const Modal = ({
                   id,
                   idx,
                   type,
                   component: ContentComponent,
                   modalClassName = "",
                   zIndex,
                   width,
                   maxHeight,
                   title,
                   onCancel,
                   onConfirm,
                   closeBtn,
                   message,
                   cancelText,
                   confirmText,
                   position,
                   ...restContentProps
               }: ModalProps) => {
    const dispatch = useAppDispatch();

    const runAndClose = (action?: ModalAction, data?: unknown ) => {
        if (action) {
            const shouldClose = action(data);

            if (shouldClose === false) {
                return;
            }
        }

        dispatch(closeModalById(id));
    };

    const handleCancel = (data?: unknown) => {
        runAndClose(onCancel, data);
    };

    const handleConfirm = (data?: unknown) => {
        runAndClose(onConfirm, data);
    };

    return (
        <ModalBody
            className={modalClassName}
            $zIndex={zIndex ?? 1000 + idx}
        >
            <div className={"modal-inner"}>
                {type === "CONFIRM" ? (
                    <ConfirmComponent
                        $modalDepth={idx}
                        $width={width}
                    >
                        <p className={"confirm-message"}>
                            {message}
                        </p>

                        <div className={"confirm-btn-wrap"}>
                            {
                                cancelText &&
                                <Button
                                    outlined
                                    size={"sm"}
                                    radius={"sm"}
                                    onClick={() => handleCancel()}
                                >
                                    {cancelText}
                                </Button>
                            }
                            <Button
                                brand
                                size={"sm"}
                                radius={"sm"}
                                onClick={() => handleConfirm()}
                            >
                                {confirmText}
                            </Button>
                        </div>
                    </ConfirmComponent>
                ) : ContentComponent ? (
                    <ContentComponent
                        {...restContentProps}
                        modalDepth={idx}
                        width={width}
                        maxHeight={maxHeight}
                        title={title}
                        closeBtn={closeBtn}
                        position={position}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                ) : null}
            </div>
        </ModalBody>
    );
};

const ModalBody = styled.div<{
    $zIndex: number;
}>`
    position: fixed;
    inset: 0;
    z-index: ${({ $zIndex }) => $zIndex};
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-inner {
        width: 100%;
        height: 100%;
        position: relative;
    }
`;

export default Modal;