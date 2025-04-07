--- media/webrtc/helpers.cc.orig	2025-01-27 17:37:37 UTC
+++ media/webrtc/helpers.cc
@@ -43,14 +43,14 @@ void ConfigAutomaticGainControl(const AudioProcessingS
     return;
   }
 
-#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   const bool kInputVolumeAdjustmentOverrideAllowed = true;
 #elif BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_FUCHSIA)
   const bool kInputVolumeAdjustmentOverrideAllowed = false;
 #endif
 
 #if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX) || \
-    BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_FUCHSIA)
+    BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_BSD)
   // Use AGC2 digital and input volume controller.
   // TODO(crbug.com/40872787): Remove `kWebRtcAllowInputVolumeAdjustment` safely
   // and set `input_volume_controller.enabled` true.
