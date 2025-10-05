import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // If a custom domain CNAME is present, deploy will be at domain root
  const hasCustomDomain = fs.existsSync(path.resolve(__dirname, "public/CNAME"))
    && fs.readFileSync(path.resolve(__dirname, "public/CNAME"), "utf8").trim().length > 0;

  // When building on GitHub Actions without a CNAME, default base to repo name
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const computedBase = hasCustomDomain
    ? "/"
    : (mode === "production" && repoName ? `/${repoName}/` : "/");

  return {
    base: computedBase,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
