--- tools/gn/tools/gn/exec_process.cc.orig	2020-02-24 18:48:05 UTC
+++ tools/gn/tools/gn/exec_process.cc
@@ -30,6 +30,10 @@
 #include "base/posix/file_descriptor_shuffle.h"
 #endif
 
+#if defined(OS_BSD)
+#include <signal.h>
+#endif
+
 namespace internal {
 
 #if defined(OS_WIN)
