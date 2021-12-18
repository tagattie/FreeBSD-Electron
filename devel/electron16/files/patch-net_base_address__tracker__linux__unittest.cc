--- net/base/address_tracker_linux_unittest.cc.orig	2021-10-08 06:25:53 UTC
+++ net/base/address_tracker_linux_unittest.cc
@@ -4,7 +4,11 @@
 
 #include "net/base/address_tracker_linux.h"
 
+#if defined(OS_LINUX)
 #include <linux/if.h>
+#else
+#include <net/if.h>
+#endif
 #include <sched.h>
 
 #include <memory>
