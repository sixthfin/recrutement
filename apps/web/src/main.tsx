import ReactDOM from "react-dom/client";
import React from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  context: {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    queryClient: new QueryClient(),
  },
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
