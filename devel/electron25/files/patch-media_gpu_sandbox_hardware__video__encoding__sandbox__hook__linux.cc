--- media/gpu/sandbox/hardware_video_encoding_sandbox_hook_linux.cc.orig	2023-05-25 00:41:58 UTC
+++ media/gpu/sandbox/hardware_video_encoding_sandbox_hook_linux.cc
@@ -18,12 +18,15 @@
 #include "media/gpu/v4l2/v4l2_device.h"
 #endif
 
+#if !BUILDFLAG(IS_BSD)
 using sandbox::syscall_broker::BrokerFilePermission;
+#endif
 
 namespace media {
 
 bool HardwareVideoEncodingPreSandboxHook(
     sandbox::policy::SandboxLinux::Options options) {
+#if !BUILDFLAG(IS_BSD)
   sandbox::syscall_broker::BrokerCommandSet command_set;
   std::vector<BrokerFilePermission> permissions;
 
@@ -134,7 +137,7 @@ bool HardwareVideoEncodingPreSandboxHook(
 #endif  // defined(__aarch64__)
   }
 #endif
-
+#endif
   return true;
 }
 
