import { createBrowserRouter } from "react-router-dom";

import { DashboadLayout } from "./layouts/dashboard.layout";
import HomePage from "./pages/home-page";
import Summary from "./pages/Summay";
import Meta from "./pages/Meta";
import RegisterPage from "./pages/registe-page";
import Login from "./pages/login-page";
import { ProtectLayout } from "./layouts/authentication.layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectLayout>
                <DashboadLayout />
            </ProtectLayout>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/dashboard/summary",
                element: <Summary />,
            },
            {
                path: "/dashboard/metas",
                element: <Meta />,
            },
        ],
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;
