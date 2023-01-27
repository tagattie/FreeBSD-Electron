--- base/process/launch_posix.cc.orig	2023-01-26 11:40:09 UTC
+++ base/process/launch_posix.cc
@@ -64,6 +64,9 @@
 #error "macOS should use launch_mac.cc"
 #endif
 
+#if defined(OS_FREEBSD)
+#pragma weak environ
+#endif
 extern char** environ;
 
 namespace base {
