--- base/allocator/partition_allocator/partition_alloc_config.h.orig	2021-09-14 01:51:47 UTC
+++ base/allocator/partition_allocator/partition_alloc_config.h
@@ -49,9 +49,13 @@ static_assert(sizeof(void*) != 8, "");
 #define PA_HAS_LINUX_KERNEL
 #endif
 
+#if defined(OS_FREEBSD)
+#define PA_HAS_FREEBSD_KERNEL
+#endif
+
 // SpinningMutex uses either futex(2) on Linux, or a fast userspace "try"
 // operation, which is available on Windows.
-#if defined(PA_HAS_LINUX_KERNEL) || defined(OS_WIN)
+#if defined(PA_HAS_LINUX_KERNEL) || defined(PA_HAS_FREEBSD_KERNEL) || defined(OS_WIN)
 #define PA_HAS_SPINNING_MUTEX
 #endif
 
