--- electron/shell/common/api/electron_api_native_image.cc.orig	2026-06-29 20:35:15 UTC
+++ electron/shell/common/api/electron_api_native_image.cc
@@ -650,7 +650,7 @@ void Initialize(v8::Local<v8::Object> exports,
   native_image.SetMethod("createFromNamedImage",
                          &NativeImage::CreateFromNamedImage);
   native_image.SetMethod("createMenuSymbol", &NativeImage::CreateMenuSymbol);
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_BSD)
   native_image.SetMethod("createThumbnailFromPath",
                          &NativeImage::CreateThumbnailFromPath);
 #endif
