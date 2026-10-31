--- src/renderer/windows/settings/preload.ts.orig	2026-10-28 22:31:39 UTC
+++ src/renderer/windows/settings/preload.ts
@@ -22,7 +22,7 @@ contextBridge.exposeInMainWorld("ytmd", {
   requestWindowState: () => ipcRenderer.send("windowControls:requestState"),
 
   isDarwin: process.platform === "darwin",
-  isLinux: process.platform === "linux",
+  isLinux: (process.platform === "linux" || process.platform === "freebsd"),
   isWindows: process.platform === "win32",
   memoryStore: {
     set: (key: string, value: unknown) => memoryStore.set(key, value),
