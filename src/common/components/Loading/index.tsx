import {useEffect, useState} from "react";
import {useIsFetching, useIsMutating} from "@tanstack/react-query";
import LoadingItems from "./LoadingItems";

const Loading = () => {
    const isFetching = useIsFetching({
        predicate: (query) => query.state.data === undefined,
    });
    const isMutating = useIsMutating();
    const isLoading = isFetching + isMutating > 0;
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!isLoading) {
            setVisible(false);
            return;
        }
        const timer = setTimeout(() => {
            setVisible(true);
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [isLoading]);
    return visible ? <LoadingItems /> : null;
};

export default Loading;