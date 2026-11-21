--- src/app/mainWindow/modals/modalView.ts.orig	2026-11-05 06:34:20 UTC
+++ src/app/mainWindow/modals/modalView.ts
@@ -73,7 +73,7 @@ export class ModalView<T, T2> {
                 this.view.setBounds(getWindowBoundaries(this.windowAttached));
             }
         };
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             setTimeout(setBoundsFunction, 10);
         } else {
             setBoundsFunction();
