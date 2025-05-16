--- src/ui/main/rootWindow.ts.orig	2025-05-12 16:50:31 UTC
+++ src/ui/main/rootWindow.ts
@@ -268,7 +268,7 @@ export const setupRootWindow = (): void => {
         rootWindow.setFullScreen(false);
       }
 
-      if (process.platform !== 'linux') rootWindow.blur();
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') rootWindow.blur();
 
       const isTrayIconEnabled = select(
         ({ isTrayIconEnabled }) => isTrayIconEnabled ?? true
@@ -297,7 +297,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -322,7 +322,7 @@ export const setupRootWindow = (): void => {
         const icon = nativeImage.createEmpty();
         const { scaleFactor } = screen.getPrimaryDisplay();
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           rootWindowIcon.icon.forEach((representation) => {
             icon.addRepresentation({
               ...representation,
