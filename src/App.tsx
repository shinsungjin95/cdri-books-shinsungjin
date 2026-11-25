import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import router from "@/routes/router";
import {store} from "@/redux/store";
import {GlobalStyle} from "@/styles/global";
import {theme} from "@/styles/theme";
import QueryProvider from "@/api/query/provider";
import Loading from "@/common/components/Loading";
import ModalController from "@/common/components/Modal/controller";

function App() {
    return (
        <Provider store={store}>
            <QueryProvider>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <RouterProvider router={router} />
                    <Loading />
                    <ModalController />
                </ThemeProvider>
            </QueryProvider>
        </Provider>
    );
}

export default App;