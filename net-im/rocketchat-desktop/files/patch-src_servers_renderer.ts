--- src/servers/renderer.ts.orig	2022-01-02 03:55:37 UTC
+++ src/servers/renderer.ts
@@ -283,7 +283,7 @@ const updateRootWindowIconForWindows = async ({
 export default (): void => {
   handle('servers/fetch-info', fetchInfo);
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     watch(selectBadgeAndFavicon, updateRootWindowIconForLinux);
   }
 
