--- src/main/views/modalView.ts.orig	2024-12-16 19:52:04 UTC
+++ src/main/views/modalView.ts
@@ -74,7 +74,7 @@ export class ModalView<T, T2> {
         const setBoundsFunction = () => {
             this.view.setBounds(getWindowBoundaries(this.windowAttached!));
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
