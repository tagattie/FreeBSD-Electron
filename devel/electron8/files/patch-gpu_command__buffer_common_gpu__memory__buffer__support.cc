--- gpu/command_buffer/common/gpu_memory_buffer_support.cc.orig	2020-03-03 07:03:03 UTC
+++ gpu/command_buffer/common/gpu_memory_buffer_support.cc
@@ -50,7 +50,7 @@ bool IsImageSizeValidForGpuMemoryBufferFormat(const gf
 uint32_t GetPlatformSpecificTextureTarget() {
 #if defined(OS_MACOSX)
   return GL_TEXTURE_RECTANGLE_ARB;
-#elif defined(OS_ANDROID) || defined(OS_LINUX)
+#elif defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_BSD)
   return GL_TEXTURE_EXTERNAL_OES;
 #elif defined(OS_WIN) || defined(OS_FUCHSIA)
   return GL_TEXTURE_2D;
