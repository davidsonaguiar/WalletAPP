import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Summary
 from "./pages/Summay";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Meta from "./pages/Meta";

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
