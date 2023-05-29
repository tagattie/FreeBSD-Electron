--- app/lib/window.ts.orig	2023-04-27 16:45:19 UTC
+++ app/lib/window.ts
@@ -189,7 +189,7 @@ export class Window {
             } else {
                 DwmEnableBlurBehindWindow(this.window.getNativeWindowHandle(), enabled)
             }
-        } else if (process.platform === 'linux') {
+        } else if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.window.setBackgroundColor(enabled ? '#00000000' : '#131d27')
             this.window.setBlur(enabled)
         } else {
