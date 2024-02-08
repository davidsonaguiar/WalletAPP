import { createBrowserRouter } from "react-router-dom";

import { DashboadLayout } from "./layouts/dashboard.layout";
import Home from "./pages/home.page";
import Summary from "./pages/Summay";
import Meta from "./pages/Meta";
import Login from "./pages/login.page";
import { PrivateLayout } from "./layouts/private.layout";
import { RegisterPage } from "./pages/register.page";
import { PublicLayout } from "./layouts/public.layout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateLayout>
        <DashboadLayout />
      </PrivateLayout>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/dashboard/summary",
        element: <Summary />
      },
      {
        path: "/dashboard/metas",
        element: <Meta />
      }
    ]
  }, 
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/",
        element: <Login />
      }
    ]
  }
])

export default router;