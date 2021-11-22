--- net/base/address_tracker_linux_unittest.cc.orig	2021-09-14 01:51:59 UTC
+++ net/base/address_tracker_linux_unittest.cc
@@ -4,7 +4,11 @@
 
 #include "net/base/address_tracker_linux.h"
 
+#if defined(OS_LINUX)
 #include <linux/if.h>
+#else
+#include <net/if.h>
+#endif
 
 #include <memory>
 #include <unordered_set>
