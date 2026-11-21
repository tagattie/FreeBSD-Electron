--- src/main/constants.ts.orig	2026-11-21 04:40:51 UTC
+++ src/main/constants.ts
@@ -76,7 +76,7 @@ export const IS_WAYLAND =
 export const IS_FLATPAK = process.env.FLATPAK_ID !== undefined;
 
 export const IS_WAYLAND =
-    process.platform === "linux" && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
+    (process.platform === "linux" || process.platform === "freebsd") && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
 
 function getSocketPath() {
     if (process.platform === "win32") return `\\\\.\\pipe\\vesktop-${userInfo().username}`;
