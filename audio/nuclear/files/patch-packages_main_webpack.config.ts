--- packages/main/webpack.config.ts.orig	2025-05-01 23:34:50 UTC
+++ packages/main/webpack.config.ts
@@ -10,6 +10,7 @@ const osMapper: Record<string, BuildEnv['TARGET']> = {
 
 const osMapper: Record<string, BuildEnv['TARGET']> = {
   linux: 'linux',
+  freebsd: 'linux',
   darwin: 'mac',
   win32: 'windows'
 };
