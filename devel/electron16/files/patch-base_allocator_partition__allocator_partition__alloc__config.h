--- base/allocator/partition_allocator/partition_alloc_config.h.orig	2021-11-19 04:25:04 UTC
+++ base/allocator/partition_allocator/partition_alloc_config.h
@@ -57,6 +57,10 @@ static_assert(sizeof(void*) != 8, "");
 #define PA_HAS_LINUX_KERNEL
 #endif
 
+#if defined(OS_FREEBSD)
+#define PA_HAS_FREEBSD_KERNEL
+#endif
+
 // On some platforms, we implement locking by spinning in userspace, then going
 // into the kernel only if there is contention. This requires platform support,
 // namely:
@@ -71,7 +75,7 @@ static_assert(sizeof(void*) != 8, "");
 // they necessarily have a fast implementation.
 //
 // Otherwise, a userspace spinlock implementation is used.
-#if defined(PA_HAS_LINUX_KERNEL) || defined(OS_WIN) || \
+#if defined(PA_HAS_LINUX_KERNEL) || defined(PA_HAS_FREEBSD_KERNEL) || defined(OS_WIN) || \
     (defined(OS_MAC) && defined(ARCH_CPU_ARM64)) || defined(OS_FUCHSIA)
 #define PA_HAS_FAST_MUTEX
 #endif
