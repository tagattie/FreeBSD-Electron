--- config/vite/renderer.ts.orig	2026-10-31 12:49:05 UTC
+++ config/vite/renderer.ts
@@ -1,18 +1,11 @@ import path from "node:path";
 import { defineConfig } from "vite";
 import vue from "@vitejs/plugin-vue";
 import path from "node:path";
-import { execSync } from "node:child_process";
 
 const root = path.resolve(__dirname, "../..");
 
-let gitBranch: string | undefined = undefined;
-let gitCommitHash: string | undefined = undefined;
-try {
-  gitBranch = execSync("git rev-parse --abbrev-ref HEAD").toString();
-  gitCommitHash = execSync("git rev-parse HEAD").toString();
-} catch (err) {
-  console.warn("Failed to retrieve git info", err);
-}
+let gitBranch: string = "%%GIT_BRANCH%%";
+let gitCommitHash: string = "%%GIT_COMMIT_HASH%%";
 
 // https://vitejs.dev/config
 export default defineConfig({
