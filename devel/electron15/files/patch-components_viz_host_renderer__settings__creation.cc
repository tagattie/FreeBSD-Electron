--- components/viz/host/renderer_settings_creation.cc.orig	2021-11-21 11:49:08 UTC
+++ components/viz/host/renderer_settings_creation.cc
@@ -60,7 +60,7 @@ RendererSettings CreateRendererSettings() {
   renderer_settings.partial_swap_enabled =
       !command_line->HasSwitch(switches::kUIDisablePartialSwap);
 
-#if defined(OS_APPLE) || defined(OS_LINUX)
+#if defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD)
   // Simple frame rate throttling only works on macOS and Linux
   renderer_settings.apply_simple_frame_rate_throttling =
       features::IsSimpleFrameRateThrottlingEnabled();
