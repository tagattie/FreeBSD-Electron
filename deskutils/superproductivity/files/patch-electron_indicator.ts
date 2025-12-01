--- electron/indicator.ts.orig	2025-11-30 12:41:43 UTC
+++ electron/indicator.ts
@@ -14,7 +14,7 @@ const IS_MAC = process.platform === 'darwin';
 let DIR: string;
 let shouldUseDarkColors: boolean;
 const IS_MAC = process.platform === 'darwin';
-const IS_LINUX = process.platform === 'linux';
+const IS_LINUX = process.platform === 'linux' || process.platform === 'freebsd';
 const IS_WINDOWS = process.platform === 'win32';
 
 export const initIndicator = ({
