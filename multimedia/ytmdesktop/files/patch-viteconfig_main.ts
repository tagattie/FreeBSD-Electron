--- viteconfig/main.ts.orig	2025-05-15 10:47:17 UTC
+++ viteconfig/main.ts
@@ -1,22 +1,6 @@
-import { execSync } from "node:child_process";
 import { defineConfig } from "vite";
 
-let gitBranch: string = "";
-try {
-  gitBranch = execSync("git rev-parse --abbrev-ref HEAD").toString();
-} catch (e) {
-  // User has likely downloaded from the YTM Desktop via the "Download ZIP".
-  // We don't plan to support this, but at least provide users with a bit of improved UX
-  // by providing them with what to do rather than just leaving them in the dust.
-  e.message =
-    " ======= Failed to get Git Info. ======= \n" +
-    "Please make sure that when building this application you are cloning the repository from GitHub rather than using the Download ZIP option.\n" +
-    "Follow the instructions in the README.md file to clone the repository and build the application from there.\n" +
-    " ======= Failed to get Git Info. ======= \n\n" +
-    e.message;
-  // Re-throw the error so that the build fails with the updated message.
-  throw e;
-}
+let gitBranch: string = "%%GIT_BRANCH%%";
 
 // HEAD is used for production builds as they check out version tags in a detached HEAD state
 const devBuild = gitBranch !== "HEAD" && process.env.NODE_ENV === "development";
