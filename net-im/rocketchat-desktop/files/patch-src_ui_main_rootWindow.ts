--- src/ui/main/rootWindow.ts.orig	2022-01-02 03:57:21 UTC
+++ src/ui/main/rootWindow.ts
@@ -244,7 +244,7 @@ export const setupRootWindow = (): void => {
       //   rootWindow.setFullScreen(false);
       // }
 
-      if (process.platform !== 'linux') rootWindow.blur();
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') rootWindow.blur();
 
       const isTrayIconEnabled = select(
         ({ isTrayIconEnabled }) => isTrayIconEnabled ?? true
@@ -269,7 +269,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector<
       RootState,
       {
@@ -300,7 +300,7 @@ export const setupRootWindow = (): void => {
         const icon = nativeImage.createEmpty();
         const { scaleFactor } = screen.getPrimaryDisplay();
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           rootWindowIcon.icon.forEach((representation) => {
             icon.addRepresentation({
               ...representation,
