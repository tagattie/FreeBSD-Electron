--- app/lib/window.ts.orig	2026-05-07 21:46:23 UTC
+++ app/lib/window.ts
@@ -201,7 +201,7 @@ export class Window {
             } else {
                 DwmEnableBlurBehindWindow(this.window.getNativeWindowHandle(), enabled)
             }
-        } else if (process.platform === 'linux') {
+        } else if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.window.setBackgroundColor(enabled ? '#00000000' : '#131d27')
             this.window.setBlur(enabled)
         } else {
