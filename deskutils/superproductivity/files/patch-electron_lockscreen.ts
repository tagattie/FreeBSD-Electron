--- electron/lockscreen.ts.orig	2025-11-22 08:31:14 UTC
+++ electron/lockscreen.ts
@@ -7,10 +7,12 @@ export const lockscreen = (cb?: (err: unknown, stdout:
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
