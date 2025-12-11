--- src/ui/main/rootWindow.ts.orig	2025-12-11 16:28:45 UTC
+++ src/ui/main/rootWindow.ts
@@ -343,7 +343,7 @@ export const setupRootWindow = (): void => {
           rootWindow.setFullScreen(false);
         }
 
-        if (process.platform !== 'linux' && !rootWindow.isDestroyed()) {
+        if ((process.platform !== 'linux' && process.platform !== 'freebsd') && !rootWindow.isDestroyed()) {
           rootWindow.blur();
         }
 
@@ -406,7 +406,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -430,7 +430,7 @@ export const setupRootWindow = (): void => {
           const icon = nativeImage.createEmpty();
           const { scaleFactor } = screen.getPrimaryDisplay();
 
-          if (process.platform === 'linux') {
+          if (process.platform === 'linux' || process.platform === 'freebsd') {
             rootWindowIcon.icon.forEach((representation) => {
               icon.addRepresentation({
                 ...representation,
