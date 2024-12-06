import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
