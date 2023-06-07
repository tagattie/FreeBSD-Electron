--- third_party/blink/renderer/modules/peerconnection/webrtc_audio_renderer_test.cc.orig	2023-03-30 00:33:57 UTC
+++ third_party/blink/renderer/modules/peerconnection/webrtc_audio_renderer_test.cc
@@ -290,7 +290,7 @@ TEST_F(WebRtcAudioRendererTest, DISABLED_VerifySinkPar
   SetupRenderer(kDefaultOutputDeviceId);
   renderer_proxy_->Start();
 #if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_APPLE) || \
-    BUILDFLAG(IS_FUCHSIA)
+    BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_BSD)
   static const int kExpectedBufferSize = kHardwareSampleRate / 100;
 #elif BUILDFLAG(IS_ANDROID)
   static const int kExpectedBufferSize = 2 * kHardwareSampleRate / 100;
