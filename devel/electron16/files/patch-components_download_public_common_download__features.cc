--- components/download/public/common/download_features.cc.orig	2021-11-19 04:25:13 UTC
+++ components/download/public/common/download_features.cc
@@ -72,7 +72,7 @@ const base::Feature kDeleteOverwrittenDownloads{
 
 const base::Feature kAllowFileBufferSizeControl{
   "AllowFileBufferSizeControl",
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
       base::FEATURE_ENABLED_BY_DEFAULT
 #else
       base::FEATURE_DISABLED_BY_DEFAULT
