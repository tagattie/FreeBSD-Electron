--- gpu/command_buffer/service/webgpu_decoder_impl.cc.orig	2022-05-08 06:19:02 UTC
+++ gpu/command_buffer/service/webgpu_decoder_impl.cc
@@ -1012,12 +1012,12 @@ error::Error WebGPUDecoderImpl::HandleRequestAdapter(
       static_cast<DawnRequestAdapterSerial>(c.request_adapter_serial);
 
   if (gr_context_type_ != GrContextType::kVulkan) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
     SendAdapterProperties(request_adapter_serial, -1, nullptr,
                           "WebGPU on Linux requires command-line flag "
                           "--enable-features=Vulkan,UseSkiaRenderer");
     return error::kNoError;
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
   }
 
   int32_t requested_adapter_index = GetPreferredAdapterIndex(power_preference);
