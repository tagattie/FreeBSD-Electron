--- services/tracing/public/cpp/perfetto/shared_memory.cc.orig	2025-01-06 14:31:29 UTC
+++ services/tracing/public/cpp/perfetto/shared_memory.cc
@@ -39,7 +39,7 @@ base::UnsafeSharedMemoryRegion ChromeBaseSharedMemory:
   return region_.Duplicate();
 }
 
-void* ChromeBaseSharedMemory::start() const {
+const void* ChromeBaseSharedMemory::start() const {
   return mapping_.memory();
 }
 
