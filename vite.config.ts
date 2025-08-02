import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

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
    tailwindcss(),
    cloudflare(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
