import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Summary from "./pages/Summay";
import Meta from "./pages/Meta";
import Register from "./pages/Register";
import Login from "./pages/login.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/summary",
        element: <Summary />
      },
      {
        path: "/metas",
        element: <Meta />
      }
    ]
  }, 
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router;