--- src/ui/main/rootWindow.ts.orig	2025-07-30 23:45:16 UTC
+++ src/ui/main/rootWindow.ts
@@ -281,7 +281,7 @@ export const setupRootWindow = (): void => {
         rootWindow.setFullScreen(false);
       }
 
-      if (process.platform !== 'linux') rootWindow.blur();
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') rootWindow.blur();
 
       const isTrayIconEnabled = select(
         ({ isTrayIconEnabled }) => isTrayIconEnabled ?? true
@@ -310,7 +310,7 @@ export const setupRootWindow = (): void => {
     });
   });
 
-  if (process.platform === 'linux' || process.platform === 'win32') {
+  if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
     const selectRootWindowIcon = createStructuredSelector({
       globalBadge: selectGlobalBadge,
       rootWindowIcon: ({ rootWindowIcon }: RootState) => rootWindowIcon,
@@ -335,7 +335,7 @@ export const setupRootWindow = (): void => {
         const icon = nativeImage.createEmpty();
         const { scaleFactor } = screen.getPrimaryDisplay();
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           rootWindowIcon.icon.forEach((representation) => {
             icon.addRepresentation({
               ...representation,
