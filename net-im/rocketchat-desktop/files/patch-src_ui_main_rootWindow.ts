--- src/ui/main/rootWindow.ts.orig	2026-09-14 19:28:31 UTC
+++ src/ui/main/rootWindow.ts
@@ -435,7 +435,7 @@ export const setupRootWindow = (): void => {
           rootWindow.setFullScreen(false);
         }
 
-        if (process.platform !== 'linux' && !rootWindow.isDestroyed()) {
+        if ((process.platform !== 'linux' && process.platform !== 'freebsd') && !rootWindow.isDestroyed()) {
           rootWindow.blur();
         }
 
@@ -498,7 +498,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -522,7 +522,7 @@ export const setupRootWindow = (): void => {
           const icon = nativeImage.createEmpty();
           const { scaleFactor } = screen.getPrimaryDisplay();
 
-          if (process.platform === 'linux') {
+          if (process.platform === 'linux' || process.platform === 'freebsd') {
             rootWindowIcon.icon.forEach((representation) => {
               icon.addRepresentation({
                 ...representation,
