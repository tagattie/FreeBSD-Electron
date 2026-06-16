--- src/background/file/shortcuts.ts.orig	2026-06-16 13:20:46 UTC
+++ src/background/file/shortcuts.ts
@@ -16,7 +16,7 @@ export async function createDesktopShortcut(name: stri
     case "darwin":
       await createAppleScript(desktopPath, name, args);
       break;
-    case "linux":
+    case "linux": case "freebsd":
       await createLinuxDesktop(desktopPath, name, args);
       break;
     default:
