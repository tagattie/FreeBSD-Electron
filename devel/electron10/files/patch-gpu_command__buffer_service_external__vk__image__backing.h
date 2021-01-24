--- gpu/command_buffer/service/external_vk_image_backing.h.orig	2020-09-21 18:39:18 UTC
+++ gpu/command_buffer/service/external_vk_image_backing.h
@@ -154,7 +154,7 @@ class ExternalVkImageBacking final : public ClearTrack
 
  private:
 
-#if defined(OS_LINUX) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || defined(OS_ANDROID) || defined(OS_BSD)
   // Extract file descriptor from image
   int GetMemoryFd(const GrVkImageInfo& image_info);
 #endif
