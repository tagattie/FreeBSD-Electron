--- packages/main/webpack.config.ts.orig	2020-02-03 18:53:44 UTC
+++ packages/main/webpack.config.ts
@@ -12,6 +12,7 @@ interface BuildEnv {
 
 const osMapper: Record<string, BuildEnv['TARGET']> = {
   linux: 'linux',
+  freebsd: 'linux',
   darwin: 'mac',
   win32: 'windows'
 };
