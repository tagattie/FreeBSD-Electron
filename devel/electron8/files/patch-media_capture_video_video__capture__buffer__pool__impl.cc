--- media/capture/video/video_capture_buffer_pool_impl.cc.orig	2020-03-03 07:03:08 UTC
+++ media/capture/video/video_capture_buffer_pool_impl.cc
@@ -59,7 +59,7 @@ VideoCaptureBufferPoolImpl::CreateSharedMemoryViaRawFi
     int buffer_id) {
 // This requires platforms where base::SharedMemoryHandle is backed by a
 // file descriptor.
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   base::AutoLock lock(lock_);
 
   VideoCaptureBufferTracker* tracker = GetTracker(buffer_id);
