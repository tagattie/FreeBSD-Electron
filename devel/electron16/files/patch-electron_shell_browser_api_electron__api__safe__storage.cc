--- electron/shell/browser/api/electron_api_safe_storage.cc.orig	2022-05-24 16:31:07 UTC
+++ electron/shell/browser/api/electron_api_safe_storage.cc
@@ -31,7 +31,7 @@ void SetElectronCryptoReady(bool ready) {
 #endif
 
 bool IsEncryptionAvailable() {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Calling IsEncryptionAvailable() before the app is ready results in a crash
   // on Linux.
   // Refs: https://github.com/electron/electron/issues/32206.
