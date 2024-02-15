import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import router from "./routers";
import { AuthenticationProvider } from "./context/authentication.context";
import { AccountProvider } from "./context/account.context";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthenticationProvider>
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  </AuthenticationProvider>,
)
