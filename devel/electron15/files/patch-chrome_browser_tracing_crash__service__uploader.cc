--- chrome/browser/tracing/crash_service_uploader.cc.orig	2021-10-08 06:25:40 UTC
+++ chrome/browser/tracing/crash_service_uploader.cc
@@ -164,6 +164,8 @@ void TraceCrashServiceUploader::DoCompressOnBackground
   const char product[] = "Chrome_Android";
 #elif defined(OS_FUCHSIA)
   const char product[] = "Chrome_Fuchsia";
+#elif defined(OS_FREEBSD)
+  const char product[] = "Chrome_FreeBSD";
 #else
 #error Platform not supported.
 #endif
