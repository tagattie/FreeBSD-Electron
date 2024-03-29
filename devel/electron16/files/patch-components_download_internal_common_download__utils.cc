--- components/download/internal/common/download_utils.cc.orig	2021-11-19 04:25:13 UTC
+++ components/download/internal/common/download_utils.cc
@@ -55,7 +55,7 @@ const int kDefaultDownloadExpiredTimeInDays = 90;
 const int kDefaultOverwrittenDownloadExpiredTimeInDays = 90;
 
 // Default buffer size in bytes to write to the download file.
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 const int kDefaultDownloadFileBufferSize = 524288;  // Desktop uses 512 KB.
 #else
 const int kDefaultDownloadFileBufferSize = 4096;
