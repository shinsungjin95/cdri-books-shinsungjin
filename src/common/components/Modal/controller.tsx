import {createRef, useRef, type RefObject} from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import styled from "styled-components";
import Modal from "@/common/components/Modal";
import {useAppSelector} from "@/redux/hook";
import {MODAL_TRANSITION_TIMEOUT} from "@/constants";
import {getModal, unregisterModal} from "./hooks";

const ModalController = () => {
    const modals = useAppSelector((state) => state.modal.modals);

    const nodeRefs = useRef(
        new Map<string, RefObject<HTMLDivElement | null>>()
    );

    return (
        <TransitionGroup component={null}>
            {modals.map((modal, index) => {
                const { id, type, props } = modal;
                const registry = getModal(id);

                let nodeRef = nodeRefs.current.get(id);

                if (!nodeRef) {
                    nodeRef = createRef<HTMLDivElement>();
                    nodeRefs.current.set(id, nodeRef);
                }

                return (
                    <StyledTransition
                        key={id}
                        timeout={MODAL_TRANSITION_TIMEOUT}
                        nodeRef={nodeRef}
                        unmountOnExit
                        onExited={() => {
                            unregisterModal(id);
                            nodeRefs.current.delete(id);
                        }}
                    >
                        <div ref={nodeRef}>
                            <Modal
                                {...registry?.props}
                                {...props}
                                id={id}
                                idx={index}
                                type={type}
                                component={registry?.component}
                                modalClassName={`modal-body ${props.modalClassName ?? ""}`}
                            />
                        </div>
                    </StyledTransition>
                );
            })}
        </TransitionGroup>
    );
};

const StyledTransition = styled(CSSTransition)`
    &.enter {
        .modal-body {
            opacity: 0;
        }
    }

    &.enter-active {
        .modal-body {
            opacity: 1;
            transition: opacity 0.2s;
        }
    }

    &.exit {
        .modal-body {
            opacity: 1;
        }
    }

    &.exit-active {
        .modal-body {
            opacity: 0;
            transition: opacity 0.2s;
        }
    }
`;

export default ModalController;