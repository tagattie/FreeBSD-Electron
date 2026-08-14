--- src/ui/main/rootWindow.ts.orig	2026-08-10 20:24:00 UTC
+++ src/ui/main/rootWindow.ts
@@ -422,7 +422,7 @@ export const setupRootWindow = (): void => {
           rootWindow.setFullScreen(false);
         }
 
-        if (process.platform !== 'linux' && !rootWindow.isDestroyed()) {
+        if ((process.platform !== 'linux' && process.platform !== 'freebsd') && !rootWindow.isDestroyed()) {
           rootWindow.blur();
         }
 
@@ -485,7 +485,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -509,7 +509,7 @@ export const setupRootWindow = (): void => {
           const icon = nativeImage.createEmpty();
           const { scaleFactor } = screen.getPrimaryDisplay();
 
-          if (process.platform === 'linux') {
+          if (process.platform === 'linux' || process.platform === 'freebsd') {
             rootWindowIcon.icon.forEach((representation) => {
               icon.addRepresentation({
                 ...representation,
