--- media/capture/video/video_capture_device_client.cc.orig	2024-04-15 20:34:01 UTC
+++ media/capture/video/video_capture_device_client.cc
@@ -151,7 +151,7 @@ FourccAndFlip GetFourccAndFlipFromPixelFormat(
       CHECK(!is_width_odd && !is_height_odd);
       return {libyuv::FOURCC_UYVY};
     case media::PIXEL_FORMAT_RGB24:
-      if constexpr (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)) {
+      if constexpr (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)) {
         // Linux RGB24 defines red at lowest byte address,
         // see http://linuxtv.org/downloads/v4l-dvb-apis/packed-rgb.html.
         return {libyuv::FOURCC_RAW};
