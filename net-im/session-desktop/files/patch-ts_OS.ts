--- ts/OS.ts.orig	2026-04-09 02:30:11 UTC
+++ ts/OS.ts
@@ -4,7 +4,7 @@ export const isMacOS = () => process.platform === 'dar
 import { existsSync, readFileSync } from 'fs';
 
 export const isMacOS = () => process.platform === 'darwin';
-export const isLinux = () => process.platform === 'linux';
+export const isLinux = () => (process.platform === 'linux' || process.platform === 'freebsd');
 export const isWindows = (minVersion?: string) => {
   const osRelease = os.release();
 
