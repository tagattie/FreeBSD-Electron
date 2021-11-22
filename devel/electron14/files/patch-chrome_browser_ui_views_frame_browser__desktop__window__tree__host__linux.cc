--- chrome/browser/ui/views/frame/browser_desktop_window_tree_host_linux.cc.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/ui/views/frame/browser_desktop_window_tree_host_linux.cc
@@ -21,7 +21,7 @@
 
 #if BUILDFLAG(IS_CHROMEOS_LACROS)
 #include "chrome/browser/ui/views/frame/desktop_browser_frame_lacros.h"
-#else  // defined(OS_LINUX)
+#else  // defined(OS_LINUX) || defined(OS_BSD)
 #include "chrome/browser/ui/views/frame/desktop_browser_frame_aura_linux.h"
 #endif
 
@@ -60,7 +60,7 @@ BrowserDesktopWindowTreeHostLinux::BrowserDesktopWindo
       browser_frame_(browser_frame) {
 #if BUILDFLAG(IS_CHROMEOS_LACROS)
   using DesktopBrowserFrameAuraPlatform = DesktopBrowserFrameLacros;
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   using DesktopBrowserFrameAuraPlatform = DesktopBrowserFrameAuraLinux;
 #else
 #error Unknown platform
