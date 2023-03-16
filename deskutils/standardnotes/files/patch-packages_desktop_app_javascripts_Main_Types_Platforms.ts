--- packages/desktop/app/javascripts/Main/Types/Platforms.ts.orig	2023-03-16 00:42:30 UTC
+++ packages/desktop/app/javascripts/Main/Types/Platforms.ts
@@ -7,5 +7,5 @@ export function isMac(): boolean {
 }
 
 export function isLinux(): boolean {
-  return process.platform === 'linux'
+  return (process.platform === 'linux' || process.platform === 'freebsd')
 }
