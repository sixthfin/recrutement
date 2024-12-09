import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "formatjs",
            {
              ast: true,
              idInterpolationPattern: "[sha512:contenthash:base64:6]",
            },
          ],
        ],
      },
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
});
