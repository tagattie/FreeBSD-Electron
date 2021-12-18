--- electron/shell/browser/electron_browser_main_parts.h.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/browser/electron_browser_main_parts.h
@@ -67,7 +67,7 @@ class ViewsDelegate;
 class ViewsDelegateMac;
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 class DarkThemeObserver;
 #endif
 
@@ -141,7 +141,7 @@ class ElectronBrowserMainParts : public content::Brows
   std::unique_ptr<display::Screen> screen_;
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Used to notify the native theme of changes to dark mode.
   std::unique_ptr<DarkThemeObserver> dark_theme_observer_;
 #endif
