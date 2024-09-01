import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sell from "./components/Sell.jsx";
import Buy from "./components/Buy.jsx";
import BooksStore from "./components/BooksStore.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sell",
        element: <Sell />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/store",
        element: <BooksStore />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
