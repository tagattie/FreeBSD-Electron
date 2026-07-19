--- src/main/env.ts.orig	2026-07-19 13:09:37 UTC
+++ src/main/env.ts
@@ -11,5 +11,5 @@ export const isLinux = () => {
 };
 
 export const isLinux = () => {
-    return process.platform === 'linux';
+    return process.platform === 'linux' || process.platform === 'freebsd';
 };
