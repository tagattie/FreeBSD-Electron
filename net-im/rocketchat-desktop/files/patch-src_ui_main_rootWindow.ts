--- src/ui/main/rootWindow.ts.orig	2023-08-03 19:04:03 UTC
+++ src/ui/main/rootWindow.ts
@@ -258,7 +258,7 @@ export const setupRootWindow = (): void => {
         rootWindow.setFullScreen(false);
       }
 
-      if (process.platform !== 'linux') rootWindow.blur();
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') rootWindow.blur();
 
       const isTrayIconEnabled = select(
         ({ isTrayIconEnabled }) => isTrayIconEnabled ?? true
@@ -287,7 +287,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector<
       RootState,
       {
@@ -318,7 +318,7 @@ export const setupRootWindow = (): void => {
         const icon = nativeImage.createEmpty();
         const { scaleFactor } = screen.getPrimaryDisplay();
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           rootWindowIcon.icon.forEach((representation) => {
             icon.addRepresentation({
               ...representation,
