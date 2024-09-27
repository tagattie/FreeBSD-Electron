--- scripts/buildDir.js.orig	2024-09-27 08:44:53 UTC
+++ scripts/buildDir.js
@@ -0,0 +1,10 @@
+const builder = require('electron-builder')
+const Arch = builder.Arch
+
+const createPackage = require('./createPackage.js')
+
+const arch = Arch.x64;
+
+(async () => {
+  await createPackage('linux', { arch: arch })
+})()
