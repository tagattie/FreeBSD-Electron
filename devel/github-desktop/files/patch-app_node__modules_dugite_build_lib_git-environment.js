--- app/node_modules/dugite/build/lib/git-environment.js.orig	2024-07-19 23:29:21 UTC
+++ app/node_modules/dugite/build/lib/git-environment.js
@@ -49,7 +49,7 @@ function resolveGitDir(env) {
         return path.resolve(env.LOCAL_GIT_DIRECTORY);
     }
     else {
-        return resolveEmbeddedGitDir();
+        return '%%LOCALBASE%%';
     }
 }
 exports.resolveGitDir = resolveGitDir;
@@ -130,20 +130,20 @@ function setupEnvironment(environmentVariables) {
         const templateDir = `${gitDir}/share/git-core/templates`;
         env.GIT_TEMPLATE_DIR = templateDir;
     }
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         // when building Git for Linux and then running it from
         // an arbitrary location, you should set PREFIX for the
         // process to ensure that it knows how to resolve things
         env.PREFIX = gitDir;
-        if (!env.GIT_SSL_CAINFO && !env.LOCAL_GIT_DIRECTORY) {
-            // use the SSL certificate bundle included in the distribution only
-            // when using embedded Git and not providing your own bundle
-            const distDir = resolveEmbeddedGitDir();
-            const sslCABundle = `${distDir}/ssl/cacert.pem`;
-            env.GIT_SSL_CAINFO = sslCABundle;
-        }
+        // if (!env.GIT_SSL_CAINFO && !env.LOCAL_GIT_DIRECTORY) {
+        //     // use the SSL certificate bundle included in the distribution only
+        //     // when using embedded Git and not providing your own bundle
+        //     const distDir = resolveEmbeddedGitDir();
+        //     const sslCABundle = `${distDir}/ssl/cacert.pem`;
+        //     env.GIT_SSL_CAINFO = sslCABundle;
+        // }
     }
     return { env, gitLocation };
 }
 exports.setupEnvironment = setupEnvironment;
-//# sourceMappingURL=git-environment.js.map
\ No newline at end of file
+//# sourceMappingURL=git-environment.js.map
