--- third_party/vulkan-deps/vulkan-loader/src/loader/loader.c.orig	2021-10-08 06:29:25 UTC
+++ third_party/vulkan-deps/vulkan-loader/src/loader/loader.c
@@ -248,7 +248,7 @@ void *loader_device_heap_realloc(const struct loader_d
 }
 
 // Environment variables
-#if defined(__linux__) || defined(__APPLE__) || defined(__Fuchsia__) || defined(__QNXNTO__)
+#if defined(__linux__) || defined(__APPLE__) || defined(__Fuchsia__) || defined(__QNXNTO__) || defined(__FreeBSD__)
 
 static inline bool IsHighIntegrity() { return geteuid() != getuid() || getegid() != getgid(); }
 
