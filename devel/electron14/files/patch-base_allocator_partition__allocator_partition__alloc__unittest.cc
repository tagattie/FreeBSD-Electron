--- base/allocator/partition_allocator/partition_alloc_unittest.cc.orig	2021-09-14 01:51:47 UTC
+++ base/allocator/partition_allocator/partition_alloc_unittest.cc
@@ -1743,7 +1743,7 @@ TEST_F(PartitionAllocTest, LostFreeSlotSpansBug) {
 // cause flake.
 #if !defined(OS_WIN) &&            \
     (!defined(ARCH_CPU_64_BITS) || \
-     (defined(OS_POSIX) && !(defined(OS_APPLE) || defined(OS_ANDROID))))
+     (defined(OS_POSIX) && !(defined(OS_APPLE) || defined(OS_ANDROID) || defined(OS_BSD))))
 
 // The following four tests wrap a called function in an expect death statement
 // to perform their test, because they are non-hermetic. Specifically they are
@@ -1794,7 +1794,7 @@ TEST_F(PartitionAllocDeathTest, DISABLED_RepeatedTryRe
 }
 
 #endif  // !defined(ARCH_CPU_64_BITS) || (defined(OS_POSIX) &&
-        // !(defined(OS_APPLE) || defined(OS_ANDROID)))
+        // !(defined(OS_APPLE) || defined(OS_ANDROID) || defined(OS_BSD)))
 
 // Make sure that malloc(-1) dies.
 // In the past, we had an integer overflow that would alias malloc(-1) to
