import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import router from "./routers";
import { AuthenticationProvider } from "./context/authentication.context";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthenticationProvider>
    <RouterProvider router={router} />
  </AuthenticationProvider>,
)
