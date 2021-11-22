--- chrome/browser/media/webrtc/webrtc_log_uploader.cc.orig	2021-09-14 01:51:50 UTC
+++ chrome/browser/media/webrtc/webrtc_log_uploader.cc
@@ -361,6 +361,8 @@ void WebRtcLogUploader::SetupMultipart(
   const char product[] = "Chrome_Android";
 #elif BUILDFLAG(IS_CHROMEOS_ASH)
   const char product[] = "Chrome_ChromeOS";
+#elif defined(OS_FREEBSD)
+  const char product[] = "Chrome_FreeBSD";
 #else
 #error Platform not supported.
 #endif
