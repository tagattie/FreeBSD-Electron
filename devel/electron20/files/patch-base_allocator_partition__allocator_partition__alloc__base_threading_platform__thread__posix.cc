--- base/allocator/partition_allocator/partition_alloc_base/threading/platform_thread_posix.cc.orig	2022-08-01 19:04:19 UTC
+++ base/allocator/partition_allocator/partition_alloc_base/threading/platform_thread_posix.cc
@@ -17,7 +17,7 @@
 #include "base/allocator/partition_allocator/partition_alloc_base/threading/platform_thread_internal_posix.h"
 #include "build/build_config.h"
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
 #include <sys/syscall.h>
 #include <atomic>
 #endif
