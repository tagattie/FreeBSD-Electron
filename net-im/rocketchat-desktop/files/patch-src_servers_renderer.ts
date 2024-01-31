--- src/servers/renderer.ts.orig	2024-01-30 23:48:22 UTC
+++ src/servers/renderer.ts
@@ -280,7 +280,7 @@ export default (): void => {
 export default (): void => {
   handle('servers/fetch-info', fetchInfo);
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     watch(selectBadgeAndFavicon, updateRootWindowIconForLinux);
   }
 
