--- media/video/gpu_memory_buffer_video_frame_pool.cc.orig	2021-09-14 01:51:59 UTC
+++ media/video/gpu_memory_buffer_video_frame_pool.cc
@@ -716,7 +716,7 @@ void GpuMemoryBufferVideoFramePool::PoolImpl::CreateHa
   }
 
   bool is_software_backed_video_frame = !video_frame->HasTextures();
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   is_software_backed_video_frame &= !video_frame->HasDmaBufs();
 #endif
 
