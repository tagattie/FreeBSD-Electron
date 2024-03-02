--- src/renderer/windows/settings/preload.ts.orig	2024-01-31 08:57:45 UTC
+++ src/renderer/windows/settings/preload.ts
@@ -12,7 +12,7 @@ contextBridge.exposeInMainWorld("ytmd", {
 
 contextBridge.exposeInMainWorld("ytmd", {
   isDarwin: process.platform === "darwin",
-  isLinux: process.platform === "linux",
+  isLinux: (process.platform === "linux" || process.platform === "freebsd"),
   isWindows: process.platform === "win32",
   memoryStore: {
     set: (key: string, value: unknown) => memoryStore.set(key, value),
