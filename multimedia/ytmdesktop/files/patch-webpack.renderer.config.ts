--- webpack.renderer.config.ts.orig	2024-12-04 12:08:20 UTC
+++ webpack.renderer.config.ts
@@ -7,26 +7,26 @@ import { plugins } from "./webpack.plugins";
 import { rules } from "./webpack.rules";
 import { plugins } from "./webpack.plugins";
 
-let gitBranch: string = "";
-let gitCommitHash: string = "";
-try {
-  gitBranch = ChildProcess.execSync("git rev-parse --abbrev-ref HEAD").toString();
-  gitCommitHash = ChildProcess.execSync("git rev-parse HEAD").toString();
-} catch (e) {
-  // User has likely downloaded from the YTM Desktop via the "Download ZIP".
-  // We don't plan to support this, but at least provide users with a bit of improved UX
-  // by providing them with what to do rather than just leaving them in the dust.
+let gitBranch: string = "%%GIT_BRANCH%%";
+let gitCommitHash: string = "%%GIT_COMMIT_HASH%%";
+// try {
+//   gitBranch = ChildProcess.execSync("git rev-parse --abbrev-ref HEAD").toString();
+//   gitCommitHash = ChildProcess.execSync("git rev-parse HEAD").toString();
+// } catch (e) {
+//   // User has likely downloaded from the YTM Desktop via the "Download ZIP".
+//   // We don't plan to support this, but at least provide users with a bit of improved UX
+//   // by providing them with what to do rather than just leaving them in the dust.
 
-  e.message =
-    " ======= Failed to get Git Info. ======= \n" +
-    "Please make sure that when building this application you are cloning the repository from GitHub rather than using the Download ZIP option.\n" +
-    "Follow the instructions in the README.md file to clone the repository and build the application from there.\n" +
-    " ======= Failed to get Git Info. ======= \n\n" +
-    e.message;
+//   e.message =
+//     " ======= Failed to get Git Info. ======= \n" +
+//     "Please make sure that when building this application you are cloning the repository from GitHub rather than using the Download ZIP option.\n" +
+//     "Follow the instructions in the README.md file to clone the repository and build the application from there.\n" +
+//     " ======= Failed to get Git Info. ======= \n\n" +
+//     e.message;
 
-  // Re-throw the error so that the build fails with the updated message.
-  throw e;
-}
+//   // Re-throw the error so that the build fails with the updated message.
+//   throw e;
+// }
 
 rules.push({
   test: /\.css$/,
