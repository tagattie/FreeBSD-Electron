--- base/base_switches.h.orig	2020-09-21 18:39:01 UTC
+++ base/base_switches.h
@@ -38,7 +38,7 @@ extern const char kDisableHighResTimer[];
 extern const char kDisableUsbKeyboardDetect[];
 #endif
 
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
 extern const char kDisableDevShmUsage[];
 #endif
 
@@ -52,7 +52,7 @@ extern const char kReachedCodeSamplingIntervalUs[];
 extern const char kOrderfileMemoryOptimization[];
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 extern const char kEnableThreadInstructionCount[];
 #endif
 
