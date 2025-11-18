--- src/app/mainWindow/modals/modalView.ts.orig	2025-11-18 22:08:20 UTC
+++ src/app/mainWindow/modals/modalView.ts
@@ -71,7 +71,7 @@ export class ModalView<T, T2> {
                 this.view.setBounds(getWindowBoundaries(this.windowAttached));
             }
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
