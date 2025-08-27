--- src/main/screenShare.ts.orig	2025-08-27 22:18:25 UTC
+++ src/main/screenShare.ts
@@ -12,7 +12,7 @@ const isWayland =
 import { handle } from "./utils/ipcWrappers";
 
 const isWayland =
-    process.platform === "linux" && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
+    (process.platform === "linux" || process.platform === "freebsd") && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
 
 export function registerScreenShareHandler() {
     handle(IpcEvents.CAPTURER_GET_LARGE_THUMBNAIL, async (_, id: string) => {
