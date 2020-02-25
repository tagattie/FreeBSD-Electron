--- src/main/index.js.orig	2020-02-20 11:04:24 UTC
+++ src/main/index.js
@@ -22,7 +22,7 @@ const initializeLogger = appEnvironment => {
 // -----------------------------------------------
 
 // NOTE: We only support Linux, macOS and Windows but not BSD nor SunOS.
-if (!/^(darwin|win32|linux)$/i.test(process.platform)) {
+if (!/^(darwin|win32|linux|freebsd)$/i.test(process.platform)) {
   process.stdout.write(`Operating system "${process.platform}" is not supported! Please open an issue at "https://github.com/marktext/marktext".\n`)
   process.exit(1)
 }
