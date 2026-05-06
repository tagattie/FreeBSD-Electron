--- electron/indicator.ts.orig	2026-05-02 18:20:10 UTC
+++ electron/indicator.ts
@@ -58,7 +58,7 @@ const IS_MAC = process.platform === 'darwin';
 let _isListenersInitialized = false;
 
 const IS_MAC = process.platform === 'darwin';
-const IS_LINUX = process.platform === 'linux';
+const IS_LINUX = process.platform === 'linux' || process.platform === 'freebsd';
 const IS_WINDOWS = process.platform === 'win32';
 
 // Stable GUIDs per Windows distribution type.
