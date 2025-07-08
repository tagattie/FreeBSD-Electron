--- services/tracing/public/cpp/perfetto/shared_memory.h.orig	2025-01-06 14:31:29 UTC
+++ services/tracing/public/cpp/perfetto/shared_memory.h
@@ -40,7 +40,7 @@ class COMPONENT_EXPORT(TRACING_CPP) ChromeBaseSharedMe
 
   // perfetto::SharedMemory implementation. Called internally by Perfetto
   // classes.
-  void* start() const override;
+  const void* start() const override;
   size_t size() const override;
 
  private:
