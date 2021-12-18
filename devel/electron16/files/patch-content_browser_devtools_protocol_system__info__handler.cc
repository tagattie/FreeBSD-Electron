--- content/browser/devtools/protocol/system_info_handler.cc.orig	2021-11-19 04:25:15 UTC
+++ content/browser/devtools/protocol/system_info_handler.cc
@@ -53,7 +53,7 @@ std::unique_ptr<SystemInfo::Size> GfxSizeToSystemInfoS
 // 1046598, and 1153667.
 // Windows builds need more time -- see Issue 873112 and 1004472.
 // Mac builds need more time - see Issue angleproject:6182.
-#if ((defined(OS_LINUX) || defined(OS_CHROMEOS)) && !defined(NDEBUG)) || \
+#if ((defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)) && !defined(NDEBUG)) || \
     defined(OS_WIN) || defined(OS_MAC) || defined(USE_OZONE)
 static constexpr int kGPUInfoWatchdogTimeoutMultiplierOS = 3;
 #else
