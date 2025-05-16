--- src/main/views/modalView.ts.orig	2025-05-05 17:51:50 UTC
+++ src/main/views/modalView.ts
@@ -70,7 +70,7 @@ export class ModalView<T, T2> {
                 this.view.setBounds(getWindowBoundaries(this.windowAttached));
             }
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
