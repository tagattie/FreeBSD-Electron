--- chrome/test/chromedriver/chrome_launcher.cc.orig	2021-11-19 04:25:11 UTC
+++ chrome/test/chromedriver/chrome_launcher.cc
@@ -73,6 +73,10 @@
 #include <windows.h>
 #endif
 
+#if defined(OS_BSD)
+#include <sys/wait.h>
+#endif
+
 namespace {
 
 const char* const kCommonSwitches[] = {
