--- app/lib/window.ts.orig	2023-02-20 10:40:49 UTC
+++ app/lib/window.ts
@@ -185,7 +185,7 @@ export class Window {
             } else {
                 DwmEnableBlurBehindWindow(this.window.getNativeWindowHandle(), enabled)
             }
-        } else if (process.platform === 'linux') {
+        } else if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.window.setBackgroundColor(enabled ? '#00000000' : '#131d27')
             this.window.setBlur(enabled)
         } else {
