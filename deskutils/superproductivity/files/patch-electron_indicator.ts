--- electron/indicator.ts.orig	2026-02-28 23:19:19 UTC
+++ electron/indicator.ts
@@ -41,7 +41,7 @@ const IS_MAC = process.platform === 'darwin';
 let _lastFocusModeMode: string;
 
 const IS_MAC = process.platform === 'darwin';
-const IS_LINUX = process.platform === 'linux';
+const IS_LINUX = process.platform === 'linux' || process.platform === 'freebsd';
 const IS_WINDOWS = process.platform === 'win32';
 
 // Stable GUIDs per Windows distribution type.
