import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy} from "react";
import {ROUTES} from "@/constants";

// 에러
const ErrorPage = lazy(() => import("@/pages/error"));

// page
const Root = lazy(() => import("@/routes/root"));
const BookList = lazy(() => import("@/pages/book/list"));
const BookSave = lazy(() => import("@/pages/book/save"));


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.BOOKS.LIST} replace />,
            },
            {
                path: ROUTES.BOOKS.LIST,
                element: <BookList />,
            },
            {
                path: ROUTES.BOOKS.SAVED,
                element: <BookSave />,
            },
        ],
    },
]);

export default router;
