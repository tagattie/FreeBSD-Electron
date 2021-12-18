--- base/allocator/partition_allocator/partition_root.cc.orig	2021-11-19 04:25:04 UTC
+++ base/allocator/partition_allocator/partition_root.cc
@@ -29,7 +29,7 @@
 #include "wow64apiset.h"
 #endif
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include <pthread.h>
 #endif
 
@@ -43,7 +43,7 @@ namespace base {
 
 namespace {
 
-#if defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 // NO_THREAD_SAFETY_ANALYSIS: acquires the lock and doesn't release it, by
 // design.
@@ -112,7 +112,7 @@ void AfterForkInChild() {
   internal::ThreadCacheRegistry::Instance()
       .ForcePurgeAllThreadAfterForkUnsafe();
 }
-#endif  // defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 std::atomic<bool> g_global_init_called;
 void PartitionAllocMallocInitOnce() {
@@ -122,7 +122,7 @@ void PartitionAllocMallocInitOnce() {
   if (!g_global_init_called.compare_exchange_strong(expected, true))
     return;
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // When fork() is called, only the current thread continues to execute in the
   // child process. If the lock is held, but *not* by this thread when fork() is
   // called, we have a deadlock.
@@ -147,7 +147,7 @@ void PartitionAllocMallocInitOnce() {
   int err =
       pthread_atfork(BeforeForkInParent, AfterForkInParent, AfterForkInChild);
   PA_CHECK(err == 0);
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 }
 
 }  // namespace
