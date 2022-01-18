--- chrome/browser/chrome_browser_main_linux.h.orig	2021-12-14 11:44:57 UTC
+++ chrome/browser/chrome_browser_main_linux.h
@@ -25,7 +25,7 @@ class ChromeBrowserMainPartsLinux : public ChromeBrows
   // ChromeBrowserMainParts overrides.
   void PreProfileInit() override;
   void PostCreateMainMessageLoop() override;
-#if defined(USE_DBUS) && !defined(OS_CHROMEOS)
+#if defined(USE_DBUS) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
   // Only needed for native Linux, to set up the low-memory-monitor-based memory
   // monitoring (which depends on D-Bus).
   void PostBrowserStart() override;
