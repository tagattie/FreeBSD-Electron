--- content/renderer/renderer_blink_platform_impl.h.orig	2021-01-23 01:42:15 UTC
+++ content/renderer/renderer_blink_platform_impl.h
@@ -30,7 +30,7 @@
 #include "third_party/blink/public/mojom/cache_storage/cache_storage.mojom.h"
 #include "third_party/blink/public/mojom/loader/code_cache.mojom.h"
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include "components/services/font/public/cpp/font_loader.h"  // nogncheck
 #include "third_party/skia/include/core/SkRefCnt.h"           // nogncheck
 #endif
@@ -221,7 +221,7 @@ class CONTENT_EXPORT RendererBlinkPlatformImpl : publi
   // Return the mojo interface for making CodeCache calls.
   blink::mojom::CodeCacheHost& GetCodeCacheHost();
 
-#if defined(OS_LINUX) || defined(OS_MACOSX)
+#if defined(OS_LINUX) || defined(OS_MACOSX) || defined(OS_BSD)
   std::unique_ptr<blink::WebSandboxSupport> sandbox_support_;
 #endif
 
@@ -242,7 +242,7 @@ class CONTENT_EXPORT RendererBlinkPlatformImpl : publi
   mojo::PendingRemote<blink::mojom::CodeCacheHost> code_cache_host_remote_;
   mojo::SharedRemote<blink::mojom::CodeCacheHost> code_cache_host_;
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   sk_sp<font_service::FontLoader> font_loader_;
 #endif
 
