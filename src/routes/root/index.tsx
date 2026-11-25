
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import Header from "@/common/components/Header";
import Loading from "@/common/components/Loading";
import LoadingContent from "@/common/components/Loading/LoadingItems";
import styled from "styled-components";
import {theme} from "@/styles/theme";
import ModalController from "@/common/components/Modal/controller";

const Root = () => {

    return (
        <Suspense fallback={<LoadingContent />}>
            <Header/>
            <RootWrapper>
                <Outlet/>
            </RootWrapper>
            <Loading />
            <ModalController/>
        </Suspense>
    );
};

const RootWrapper = styled.div`
    position: relative;
    min-height: calc(100vh - ${theme.size.headerHeight});
    max-width: 960px;
    margin: ${theme.size.headerHeight} auto 0;
`

export default Root;
