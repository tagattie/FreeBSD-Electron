--- ui/platform_window/platform_window_delegate.cc.orig	2023-01-26 11:41:02 UTC
+++ ui/platform_window/platform_window_delegate.cc
@@ -16,7 +16,7 @@ PlatformWindowDelegate::PlatformWindowDelegate() = def
 
 PlatformWindowDelegate::~PlatformWindowDelegate() = default;
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_BSD)
 void PlatformWindowDelegate::OnWindowTiledStateChanged(
     WindowTiledEdges new_tiled_edges) {}
 #endif
