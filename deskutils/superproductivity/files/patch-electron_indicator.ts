--- electron/indicator.ts.orig	2026-02-06 19:11:32 UTC
+++ electron/indicator.ts
@@ -14,7 +14,7 @@ const IS_MAC = process.platform === 'darwin';
 let DIR: string;
 let shouldUseDarkColors: boolean;
 const IS_MAC = process.platform === 'darwin';
-const IS_LINUX = process.platform === 'linux';
+const IS_LINUX = process.platform === 'linux' || process.platform === 'freebsd';
 const IS_WINDOWS = process.platform === 'win32';
 
 // Static GUID for Windows tray icon position persistence across updates.
