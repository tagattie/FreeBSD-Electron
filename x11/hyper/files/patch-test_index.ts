--- test/index.ts.orig	2025-08-31 08:00:06 UTC
+++ test/index.ts
@@ -13,7 +13,7 @@ test.before(async () => {
   let pathToBinary;
 
   switch (process.platform) {
-    case 'linux':
+    case 'linux': case 'freebsd':
       pathToBinary = path.join(__dirname, '../dist/linux-unpacked/hyper');
       break;
 
