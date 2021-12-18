--- apps/app_restore_service_browsertest.cc.orig	2021-11-19 04:25:03 UTC
+++ apps/app_restore_service_browsertest.cc
@@ -140,7 +140,7 @@ IN_PROC_BROWSER_TEST_F(PlatformAppBrowserTest, FileAcc
 }
 
 // Flaky: crbug.com/269613
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_WIN) || defined(OS_BSD)
 #define MAYBE_FileAccessIsRestored DISABLED_FileAccessIsRestored
 #else
 #define MAYBE_FileAccessIsRestored FileAccessIsRestored
