/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import React from "react";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SelectedBodyPartProvider } from "./SelectedBodyPartContext.jsx"; // Import the provider

// Create a router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SelectedBodyPartProvider>
        <RouterProvider router={router} />
      </SelectedBodyPartProvider>
    </Provider>
  </StrictMode>
);
