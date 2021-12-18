--- electron/shell/common/api/electron_api_native_image.h.orig	2021-12-03 01:46:05 UTC
+++ electron/shell/common/api/electron_api_native_image.h
@@ -74,7 +74,7 @@ class NativeImage : public gin::Wrappable<NativeImage>
                                                     const GURL& url);
   static gin::Handle<NativeImage> CreateFromNamedImage(gin::Arguments* args,
                                                        std::string name);
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
   static v8::Local<v8::Promise> CreateThumbnailFromPath(
       v8::Isolate* isolate,
       const base::FilePath& path,
