import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "Cisl-Quiz-App";
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // 👈 Required for GitHub Pages
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
