--- chrome/browser/ui/views/frame/browser_desktop_window_tree_host_linux.h.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/ui/views/frame/browser_desktop_window_tree_host_linux.h
@@ -67,7 +67,7 @@ class BrowserDesktopWindowTreeHostLinux
 // browser_desktop_window_tree_host_lacros.cc.
 #if BUILDFLAG(IS_CHROMEOS_LACROS)
   using DesktopBrowserFrameAuraPlatform = DesktopBrowserFrameLacros;
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   using DesktopBrowserFrameAuraPlatform = DesktopBrowserFrameAuraLinux;
 #else
 #error Unknown platform
