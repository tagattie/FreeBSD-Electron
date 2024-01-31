--- src/ui/main/rootWindow.ts.orig	2024-01-30 23:48:22 UTC
+++ src/ui/main/rootWindow.ts
@@ -255,7 +255,7 @@ export const setupRootWindow = (): void => {
         rootWindow.setFullScreen(false);
       }
 
-      if (process.platform !== 'linux') rootWindow.blur();
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') rootWindow.blur();
 
       const isTrayIconEnabled = select(
         ({ isTrayIconEnabled }) => isTrayIconEnabled ?? true
@@ -284,7 +284,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -309,7 +309,7 @@ export const setupRootWindow = (): void => {
         const icon = nativeImage.createEmpty();
         const { scaleFactor } = screen.getPrimaryDisplay();
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           rootWindowIcon.icon.forEach((representation) => {
             icon.addRepresentation({
               ...representation,
