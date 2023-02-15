--- chrome/browser/ui/window_sizer/window_sizer.cc.orig	2023-02-01 18:43:13 UTC
+++ chrome/browser/ui/window_sizer/window_sizer.cc
@@ -205,7 +205,7 @@ void WindowSizer::GetBrowserWindowBoundsAndShowState(
       browser, window_bounds, show_state);
 }
 
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 // Linux has its own implementation, see WindowSizerLinux.
 // static
 void WindowSizer::GetBrowserWindowBoundsAndShowState(
