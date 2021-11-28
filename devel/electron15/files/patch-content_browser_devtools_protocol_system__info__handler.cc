--- content/browser/devtools/protocol/system_info_handler.cc.orig	2021-10-08 06:25:48 UTC
+++ content/browser/devtools/protocol/system_info_handler.cc
@@ -53,7 +53,7 @@ std::unique_ptr<SystemInfo::Size> GfxSizeToSystemInfoS
 // Windows builds need more time -- see Issue 873112 and 1004472.
 // Mac builds need more time - see Issue angleproject:6182.
 // ASAN builds need more time -- see Issue 1167875.
-#if ((defined(OS_LINUX) || defined(OS_CHROMEOS)) && !defined(NDEBUG)) || \
+#if ((defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)) && !defined(NDEBUG)) || \
     defined(OS_WIN) || defined(OS_MAC) || defined(ADDRESS_SANITIZER) ||  \
     defined(USE_OZONE)
 const int kGPUInfoWatchdogTimeoutMs = 30000;
