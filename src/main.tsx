import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers";
import { AuthenticationProvider } from "./context/authentication.context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthenticationProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </AuthenticationProvider>
);
