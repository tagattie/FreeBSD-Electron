--- src/ui/main/rootWindow.ts.orig	2026-10-11 02:05:54 UTC
+++ src/ui/main/rootWindow.ts
@@ -460,7 +460,7 @@ export const setupRootWindow = (): void => {
           rootWindow.setFullScreen(false);
         }
 
-        if (process.platform !== 'linux' && !rootWindow.isDestroyed()) {
+        if ((process.platform !== 'linux' && process.platform !== 'freebsd') && !rootWindow.isDestroyed()) {
           rootWindow.blur();
         }
 
@@ -523,7 +523,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -547,7 +547,7 @@ export const setupRootWindow = (): void => {
           const icon = nativeImage.createEmpty();
           const { scaleFactor } = screen.getPrimaryDisplay();
 
-          if (process.platform === 'linux') {
+          if (process.platform === 'linux' || process.platform === 'freebsd') {
             rootWindowIcon.icon.forEach((representation) => {
               icon.addRepresentation({
                 ...representation,
