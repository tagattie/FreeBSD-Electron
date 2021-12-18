--- base/allocator/partition_allocator/address_pool_manager.cc.orig	2021-11-19 04:25:04 UTC
+++ base/allocator/partition_allocator/address_pool_manager.cc
@@ -8,6 +8,13 @@
 #include <sys/mman.h>
 #endif
 
+#if defined(OS_FREEBSD)
+#include <sys/mman.h>
+#include <fcntl.h>
+
+#include "base/posix/eintr_wrapper.h"
+#endif
+
 #include <algorithm>
 #include <limits>
 
