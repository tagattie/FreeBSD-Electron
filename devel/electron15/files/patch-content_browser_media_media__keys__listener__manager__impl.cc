--- content/browser/media/media_keys_listener_manager_impl.cc.orig	2021-11-28 04:34:37 UTC
+++ content/browser/media/media_keys_listener_manager_impl.cc
@@ -230,7 +230,7 @@ void MediaKeysListenerManagerImpl::StartListeningForMe
 
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_WIN) || \
+#if (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_WIN) || defined(OS_BSD) || \
     defined(OS_MAC)
   system_media_controls_ = system_media_controls::SystemMediaControls::Create(
       media::AudioManager::GetGlobalAppName());
