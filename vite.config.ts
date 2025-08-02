import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react" }),
    react({
      babel: {
        plugins: [
          // other Babel plugins
          [
            "@locator/babel-jsx/dist",
            {
              env: "development",
            },
          ],
        ],
      },
    }),
    cloudflare(),
  ],
});
