--- test/index.ts.orig	2022-01-07 19:55:31 UTC
+++ test/index.ts
@@ -12,7 +12,7 @@ test.before(async () => {
   let pathToBinary;
 
   switch (process.platform) {
-    case 'linux':
+    case 'linux': case 'freebsd':
       pathToBinary = path.join(__dirname, '../dist/linux-unpacked/hyper');
       break;
 
