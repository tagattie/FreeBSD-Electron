--- chrome/browser/glic/host/glic_page_handler.cc.orig	2026-01-07 00:52:53 UTC
+++ chrome/browser/glic/host/glic_page_handler.cc
@@ -134,7 +134,7 @@ constexpr mojom::Platform kPlatform = mojom::Platform:
 constexpr mojom::Platform kPlatform = mojom::Platform::kMacOS;
 #elif BUILDFLAG(IS_WIN)
 constexpr mojom::Platform kPlatform = mojom::Platform::kWindows;
-#elif BUILDFLAG(IS_LINUX)
+#elif BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 constexpr mojom::Platform kPlatform = mojom::Platform::kLinux;
 #elif BUILDFLAG(IS_CHROMEOS)
 constexpr mojom::Platform kPlatform = mojom::Platform::kChromeOS;
