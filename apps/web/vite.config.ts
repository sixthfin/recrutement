import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
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
    vanillaExtractPlugin(),
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
});
