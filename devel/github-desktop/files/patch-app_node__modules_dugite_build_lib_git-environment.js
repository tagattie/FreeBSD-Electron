--- app/node_modules/dugite/build/lib/git-environment.js.orig	2023-08-16 00:06:11 UTC
+++ app/node_modules/dugite/build/lib/git-environment.js
@@ -4,7 +4,7 @@ exports.setupEnvironment = void 0;
 const path = require("path");
 function resolveEmbeddedGitDir() {
     if (process.platform === 'darwin' ||
-        process.platform === 'linux' ||
+        process.platform === 'linux' || process.platform === 'freebsd' ||
         process.platform === 'android' ||
         process.platform === 'win32') {
         const s = path.sep;
@@ -117,4 +117,4 @@ function setupEnvironment(environmentVariables) {
     return { env, gitLocation };
 }
 exports.setupEnvironment = setupEnvironment;
-//# sourceMappingURL=git-environment.js.map
\ No newline at end of file
+//# sourceMappingURL=git-environment.js.map
