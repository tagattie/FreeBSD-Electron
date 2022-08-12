--- base/process/launch_posix.cc.orig	2022-08-01 19:04:19 UTC
+++ base/process/launch_posix.cc
@@ -63,6 +63,9 @@
 #error "macOS should use launch_mac.cc"
 #endif
 
+#if defined(OS_FREEBSD)
+#pragma weak environ
+#endif
 extern char** environ;
 
 namespace base {
