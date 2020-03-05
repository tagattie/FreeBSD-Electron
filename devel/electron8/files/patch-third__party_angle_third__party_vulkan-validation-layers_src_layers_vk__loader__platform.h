--- third_party/angle/third_party/vulkan-validation-layers/src/layers/vk_loader_platform.h.orig	2020-03-03 07:10:16 UTC
+++ third_party/angle/third_party/vulkan-validation-layers/src/layers/vk_loader_platform.h
@@ -31,7 +31,7 @@
 #include "vulkan/vk_platform.h"
 #include "vulkan/vk_sdk_platform.h"
 
-#if defined(__linux__) || defined(__APPLE__)
+#if defined(__linux__) || defined(__APPLE__) || defined(__FreeBSD__)
 /* Linux-specific common code: */
 
 // Headers:
