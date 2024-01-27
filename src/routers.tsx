import { createBrowserRouter } from "react-router-dom";

import { DashboadLayout } from "./layouts/dashboard.layout";
import Home from "./pages/home.page";
import Summary from "./pages/Summay";
import Meta from "./pages/Meta";
import Register from "./pages/Register";
import Login from "./pages/login.page";
import { ProtectLayout } from "./layouts/authentication.layout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <ProtectLayout>
        <DashboadLayout />
      </ProtectLayout>
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
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <Login />
  }
])

export default router;