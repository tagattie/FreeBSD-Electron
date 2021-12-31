--- test/index.ts.orig	2021-12-30 13:34:30 UTC
+++ test/index.ts
@@ -14,7 +14,7 @@ test.before(async () => {
   let pathToBinary;
 
   switch (process.platform) {
-    case 'linux':
+    case 'linux': case 'freebsd':
       pathToBinary = path.join(__dirname, '../dist/linux-unpacked/hyper');
       break;
 
