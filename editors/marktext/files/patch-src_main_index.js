--- src/main/index.js.orig	2020-12-27 12:26:19 UTC
+++ src/main/index.js
@@ -22,7 +22,7 @@ const initializeLogger = appEnvironment => {
 // -----------------------------------------------
 
 // NOTE: We only support Linux, macOS and Windows but not BSD nor SunOS.
-if (!/^(darwin|win32|linux)$/i.test(process.platform)) {
+if (!/^(darwin|win32|linux|freebsd)$/i.test(process.platform)) {
   process.stdout.write(`Operating system "${process.platform}" is not supported! Please open an issue at "https://github.com/marktext/marktext".\n`)
   process.exit(1)
 }
@@ -34,7 +34,7 @@ const appEnvironment = setupEnvironment(args)
 initializeLogger(appEnvironment)
 
 // Workaround for GH#1359
-if (process.platform === 'linux' && process.env.XDG_SESSION_TYPE === 'wayland') {
+if ((process.platform === 'linux' || process.platform === 'freebsd') && process.env.XDG_SESSION_TYPE === 'wayland') {
   app.disableHardwareAcceleration()
 }
 
