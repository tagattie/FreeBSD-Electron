--- media/audio/audio_manager.h.orig	2020-03-03 07:03:08 UTC
+++ media/audio/audio_manager.h
@@ -60,7 +60,7 @@ class MEDIA_EXPORT AudioManager {
   static std::unique_ptr<AudioManager> CreateForTesting(
       std::unique_ptr<AudioThread> audio_thread);
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Sets the name of the audio source as seen by external apps. Only actually
   // used with PulseAudio as of this writing.
   static void SetGlobalAppName(const std::string& app_name);
