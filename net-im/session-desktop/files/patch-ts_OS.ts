--- ts/OS.ts.orig	2022-01-08 06:34:10 UTC
+++ ts/OS.ts
@@ -3,7 +3,7 @@ import os from 'os';
 import semver from 'semver';
 
 export const isMacOS = () => process.platform === 'darwin';
-export const isLinux = () => process.platform === 'linux';
+export const isLinux = () => (process.platform === 'linux' || process.platform === 'freebsd');
 export const isWindows = (minVersion?: string) => {
   const osRelease = os.release();
 
