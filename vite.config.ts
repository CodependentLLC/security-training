import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/security-training/",   // 👈 repo name, between slashes
  build: {
    outDir: "dist",              // 👈 we'll deploy from docs/ to avoid confusion
  },
});
