--- tools/memory/partition_allocator/inspect_utils.h.orig	2022-08-01 19:04:53 UTC
+++ tools/memory/partition_allocator/inspect_utils.h
@@ -60,7 +60,7 @@ class RemoteProcessMemoryReader {
   const pid_t pid_;
   bool is_valid_;
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   base::ScopedFD mem_fd_;
 #elif BUILDFLAG(IS_MAC)
   task_t task_;
