--- content/browser/renderer_host/render_process_host_impl.cc.orig	2023-01-27 05:20:34 UTC
+++ content/browser/renderer_host/render_process_host_impl.cc
@@ -214,7 +214,7 @@
 #include "third_party/blink/public/mojom/android_font_lookup/android_font_lookup.mojom.h"
 #endif
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
 #include <sys/resource.h>
 
 #include "components/services/font/public/mojom/font_service.mojom.h"  // nogncheck
@@ -1138,7 +1138,7 @@ static constexpr size_t kUnknownPlatformProcessLimit =
 // to indicate failure and std::numeric_limits<size_t>::max() to indicate
 // unlimited.
 size_t GetPlatformProcessLimit() {
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
   struct rlimit limit;
   if (getrlimit(RLIMIT_NPROC, &limit) != 0)
     return kUnknownPlatformProcessLimit;
@@ -1225,7 +1225,7 @@ class RenderProcessHostImpl::IOThreadHostImpl : public
         return;
     }
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
     if (auto font_receiver = receiver.As<font_service::mojom::FontService>()) {
       ConnectToFontService(std::move(font_receiver));
       return;
@@ -2127,7 +2127,7 @@ void RenderProcessHostImpl::ReinitializeLogging(
 }
 #endif  // BUILDFLAG(IS_CHROMEOS_ASH)
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
 void RenderProcessHostImpl::CreateStableVideoDecoder(
     mojo::PendingReceiver<media::stable::mojom::StableVideoDecoder> receiver) {
   if (!stable_video_decoder_factory_remote_.is_bound()) {
@@ -3278,6 +3278,7 @@ void RenderProcessHostImpl::PropagateBrowserCommandLin
     switches::kDisableSpeechAPI,
     switches::kDisableThreadedCompositing,
     switches::kDisableTouchDragDrop,
+    switches::kDisableUnveil,
     switches::kDisableV8IdleTasks,
     switches::kDisableVideoCaptureUseGpuMemoryBuffer,
     switches::kDisableWebGLImageChromium,
@@ -4751,7 +4752,7 @@ void RenderProcessHostImpl::ResetIPC() {
   coordinator_connector_receiver_.reset();
   tracing_registration_.reset();
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
   stable_video_decoder_factory_remote_.reset();
 #endif  // BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
 
