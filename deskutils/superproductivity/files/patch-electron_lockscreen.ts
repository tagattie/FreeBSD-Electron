--- electron/lockscreen.ts.orig	2026-05-02 18:20:10 UTC
+++ electron/lockscreen.ts
@@ -13,10 +13,12 @@ export const lockscreen = (cb?: (err: unknown, stdout:
     win32: 'rundll32.exe user32.dll, LockWorkStation',
     linux:
       '(hash gnome-screensaver-command 2>/dev/null && gnome-screensaver-command -l) || (hash dm-tool 2>/dev/null && dm-tool lock) || (qdbus org.freedesktop.ScreenSaver /ScreenSaver Lock)',
+    freebsd:
+      '(hash gnome-screensaver-command 2>/dev/null && gnome-screensaver-command -l) || (hash dm-tool 2>/dev/null && dm-tool lock) || (qdbus org.freedesktop.ScreenSaver /ScreenSaver Lock)',
   };
 
   const lockCommandToUse = lockCommands[
-    process.platform as 'darwin' | 'win32' | 'linux'
+    process.platform as 'darwin' | 'win32' | 'linux' | 'freebsd'
   ] as any;
   if (!lockCommandToUse) {
     throw new Error(`lockscreen doesn't support your platform (${process.platform})`);
