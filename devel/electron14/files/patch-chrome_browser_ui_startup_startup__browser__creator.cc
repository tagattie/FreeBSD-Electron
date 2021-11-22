--- chrome/browser/ui/startup/startup_browser_creator.cc.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/ui/startup/startup_browser_creator.cc
@@ -130,7 +130,7 @@
 #include "chrome/browser/ui/startup/web_app_protocol_handling_startup_utils.h"
 
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 #include "chrome/browser/ui/startup/web_app_url_handling_startup_utils.h"
 #endif
 
@@ -467,7 +467,7 @@ bool MaybeLaunchApplication(
   return false;
 }
 
-#if defined(OS_WIN) || (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(OS_WIN) || (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 bool MaybeLaunchUrlHandlerWebAppFromCmd(
     const base::CommandLine& command_line,
     const base::FilePath& cur_dir,
@@ -1165,7 +1165,7 @@ bool StartupBrowserCreator::StartupLaunchAfterProtocol
   }
 
   // Web app URL handling.
-#if defined(OS_WIN) || (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(OS_WIN) || (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   if (MaybeLaunchUrlHandlerWebAppFromCmd(command_line, cur_dir, process_startup,
                                          last_used_profile,
                                          last_opened_profiles)) {
