--- src/main/autoStart.ts.orig	2026-11-05 17:23:08 UTC
+++ src/main/autoStart.ts
@@ -98,7 +98,7 @@ export const autoStart =
 // Thus, only use the portal inside Flatpak, where the app is actually correct.
 // Maybe there is a way to fix it outside of flatpak, but I couldn't figure it out.
 export const autoStart =
-    process.platform !== "linux"
+    (process.platform !== "linux" && process.platform !== "freebsd")
         ? autoStartWindowsMac
         : IS_FLATPAK
           ? makeAutoStartLinuxPortal()
