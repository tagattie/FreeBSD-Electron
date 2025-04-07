--- third_party/blink/renderer/modules/media/audio/audio_device_factory.cc.orig	2025-03-24 20:50:14 UTC
+++ third_party/blink/renderer/modules/media/audio/audio_device_factory.cc
@@ -34,7 +34,7 @@ AudioDeviceFactory* g_factory_override = nullptr;
 // Set when the default factory is overridden.
 AudioDeviceFactory* g_factory_override = nullptr;
 
-#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 // Due to driver deadlock issues on Windows (http://crbug/422522) there is a
 // chance device authorization response is never received from the browser side.
 // In this case we will time out, to avoid renderer hang forever waiting for
