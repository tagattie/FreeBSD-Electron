--- app/lib/window.ts.orig	2024-09-26 08:04:31 UTC
+++ app/lib/window.ts
@@ -193,7 +193,7 @@ export class Window {
             } else {
                 DwmEnableBlurBehindWindow(this.window.getNativeWindowHandle(), enabled)
             }
-        } else if (process.platform === 'linux') {
+        } else if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.window.setBackgroundColor(enabled ? '#00000000' : '#131d27')
             this.window.setBlur(enabled)
         } else {
