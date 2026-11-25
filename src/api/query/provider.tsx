import {useState, type ReactNode} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {useModal} from "@/common/components/Modal/hooks";
import {MODAL_PAYLOAD} from "@/constants/Modal";
import {createQueryClient} from "./client";
import {API_ERROR_MSG} from "@/constants";


const QueryProvider = ({ children }: { children: ReactNode }) => {
    const {callModal} = useModal();

    const [queryClient] = useState(() =>
        createQueryClient((error) => {
            callModal(
                MODAL_PAYLOAD.ERROR_CONFIRM({
                    props: {
                        message: API_ERROR_MSG(error),
                    },
                })
            );
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;