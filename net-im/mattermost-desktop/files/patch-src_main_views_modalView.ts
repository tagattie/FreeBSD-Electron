--- src/main/views/modalView.ts.orig	2024-05-16 20:45:52 UTC
+++ src/main/views/modalView.ts
@@ -72,7 +72,7 @@ export class ModalView<T, T2> {
         const setBoundsFunction = () => {
             this.view.setBounds(getWindowBoundaries(this.windowAttached!));
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
