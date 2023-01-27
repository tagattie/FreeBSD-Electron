--- chrome/browser/ui/window_sizer/window_sizer.cc.orig	2023-01-26 11:40:11 UTC
+++ chrome/browser/ui/window_sizer/window_sizer.cc
@@ -173,7 +173,7 @@ void WindowSizer::GetBrowserWindowBoundsAndShowState(
       browser, window_bounds, show_state);
 }
 
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 // Linux has its own implementation, see WindowSizerLinux.
 // static
 void WindowSizer::GetBrowserWindowBoundsAndShowState(
