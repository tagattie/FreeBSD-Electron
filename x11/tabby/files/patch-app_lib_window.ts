--- app/lib/window.ts.orig	2025-01-22 22:44:36 UTC
+++ app/lib/window.ts
@@ -199,7 +199,7 @@ export class Window {
             } else {
                 DwmEnableBlurBehindWindow(this.window.getNativeWindowHandle(), enabled)
             }
-        } else if (process.platform === 'linux') {
+        } else if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.window.setBackgroundColor(enabled ? '#00000000' : '#131d27')
             this.window.setBlur(enabled)
         } else {
