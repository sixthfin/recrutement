import ReactDOM from "react-dom/client";
import React from "react";

import { hello } from "@sixthfin-auth/core-ui";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div>
      {import.meta.env.VITE_API_BASE_URL} {hello}
    </div>
  </React.StrictMode>
);
