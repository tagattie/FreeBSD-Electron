--- electron/shell/app/electron_main_delegate.cc.orig	2020-05-18 21:17:08 UTC
+++ electron/shell/app/electron_main_delegate.cc
@@ -8,7 +8,7 @@
 #include <memory>
 #include <string>
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include <glib.h>  // for g_setenv()
 #endif
 
@@ -255,7 +255,7 @@ bool ElectronMainDelegate::BasicStartupComplete(int* e
     base::win::PinUser32();
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Check for --no-sandbox parameter when running as root.
   if (getuid() == 0 && IsSandboxEnabled(command_line))
     LOG(FATAL) << "Running as root without --"
@@ -295,7 +295,7 @@ void ElectronMainDelegate::PostEarlyInitialization(boo
         ui::ResourceBundle::GetSharedInstance().GetLocaleFilePath(locale);
     if (!locale_file_path.empty()) {
       custom_locale = locale;
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
       /* When built with USE_GLIB, libcc's GetApplicationLocaleInternal() uses
        * glib's g_get_language_names(), which keys off of getenv("LC_ALL") */
       g_setenv("LC_ALL", custom_locale.c_str(), TRUE);
