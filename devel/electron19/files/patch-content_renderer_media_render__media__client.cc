--- content/renderer/media/render_media_client.cc.orig	2022-05-25 04:01:01 UTC
+++ content/renderer/media/render_media_client.cc
@@ -36,7 +36,7 @@ bool RenderMediaClient::IsSupportedAudioType(const med
 }
 
 bool RenderMediaClient::IsSupportedVideoType(const media::VideoType& type) {
-#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   // If we're not on the render thread (ie, from the media thread), then don't
   // even bother trying to populate the cache.
   if (auto* render_thread = RenderThreadImpl::current()) {
