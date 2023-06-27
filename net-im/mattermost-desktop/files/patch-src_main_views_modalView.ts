--- src/main/views/modalView.ts.orig	2023-06-19 18:19:05 UTC
+++ src/main/views/modalView.ts
@@ -71,7 +71,7 @@ export class ModalView<T, T2> {
         const setBoundsFunction = () => {
             this.view.setBounds(getWindowBoundaries(this.windowAttached!));
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
