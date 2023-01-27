--- electron/spec/fixtures/native-addon/uv-dlopen/index.js.orig	2023-01-18 11:12:36 UTC
+++ electron/spec/fixtures/native-addon/uv-dlopen/index.js
@@ -2,7 +2,7 @@ const testLoadLibrary = require('./build/Release/test_
 
 const lib = (() => {
   switch (process.platform) {
-    case 'linux':
+    case 'linux': case 'freebsd':
       return `${__dirname}/build/Release/foo.so`;
     case 'darwin':
       return `${__dirname}/build/Release/foo.dylib`;
