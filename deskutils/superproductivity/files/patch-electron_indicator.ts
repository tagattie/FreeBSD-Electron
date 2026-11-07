--- electron/indicator.ts.orig	2026-11-06 19:38:07 UTC
+++ electron/indicator.ts
@@ -58,7 +58,7 @@ const IS_MAC = process.platform === 'darwin';
 let _isListenersInitialized = false;
 
 const IS_MAC = process.platform === 'darwin';
-const IS_LINUX = process.platform === 'linux';
+const IS_LINUX = process.platform === 'linux' || process.platform === 'freebsd';
 const IS_WINDOWS = process.platform === 'win32';
 
 // No tray-icon GUID on Windows, for any channel.
