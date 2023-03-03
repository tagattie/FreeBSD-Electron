--- src/main/views/modalView.ts.orig	2023-03-03 01:49:53 UTC
+++ src/main/views/modalView.ts
@@ -68,7 +68,7 @@ export class ModalView<T, T2> {
         const setBoundsFunction = () => {
             this.view.setBounds(getWindowBoundaries(this.windowAttached!));
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
