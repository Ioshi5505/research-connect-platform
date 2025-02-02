import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Support from "@/pages/Support";
import SupportRequests from "@/pages/SupportRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/support-requests",
    element: <SupportRequests />,
  },
]);

export default router;