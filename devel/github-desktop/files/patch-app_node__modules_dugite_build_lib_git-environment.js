--- app/node_modules/dugite/build/lib/git-environment.js.orig	2025-05-16 06:29:38 UTC
+++ app/node_modules/dugite/build/lib/git-environment.js
@@ -46,7 +46,7 @@ function resolveGitDir(localGitDir = process.env.LOCAL
  *  returns with it after resolving it as a path.
  */
 function resolveGitDir(localGitDir = process.env.LOCAL_GIT_DIRECTORY) {
-    return localGitDir ? path.resolve(localGitDir) : resolveEmbeddedGitDir();
+    return '%%LOCALBASE%%';
 }
 exports.resolveGitDir = resolveGitDir;
 /**
@@ -119,20 +119,20 @@ function setupEnvironment(environmentVariables, proces
         const templateDir = `${gitDir}/share/git-core/templates`;
         env.set('GIT_TEMPLATE_DIR', templateDir);
     }
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         // when building Git for Linux and then running it from
         // an arbitrary location, you should set PREFIX for the
         // process to ensure that it knows how to resolve things
         env.set('PREFIX', gitDir);
-        if (!env.get('GIT_SSL_CAINFO') && !env.get('LOCAL_GIT_DIRECTORY')) {
-            // use the SSL certificate bundle included in the distribution only
-            // when using embedded Git and not providing your own bundle
-            const distDir = resolveEmbeddedGitDir();
-            const sslCABundle = `${distDir}/ssl/cacert.pem`;
-            env.set('GIT_SSL_CAINFO', sslCABundle);
-        }
+        // if (!env.get('GIT_SSL_CAINFO') && !env.get('LOCAL_GIT_DIRECTORY')) {
+        //     // use the SSL certificate bundle included in the distribution only
+        //     // when using embedded Git and not providing your own bundle
+        //     const distDir = resolveEmbeddedGitDir();
+        //     const sslCABundle = `${distDir}/ssl/cacert.pem`;
+        //     env.set('GIT_SSL_CAINFO', sslCABundle);
+        // }
     }
     return { env: Object.fromEntries(env.entries()), gitLocation };
 }
 exports.setupEnvironment = setupEnvironment;
-//# sourceMappingURL=git-environment.js.map
\ No newline at end of file
+//# sourceMappingURL=git-environment.js.map
