--- chrome/browser/ui/browser_dialogs.h.orig	2021-11-19 04:25:10 UTC
+++ chrome/browser/ui/browser_dialogs.h
@@ -25,7 +25,7 @@
 #include "ui/gfx/native_widget_types.h"
 
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 #include "chrome/browser/web_applications/web_app_id.h"
 #endif
 
@@ -79,7 +79,7 @@ struct SelectedFileInfo;
 }  // namespace ui
 
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 namespace web_app {
 struct UrlHandlerLaunchParams;
 }
@@ -188,7 +188,7 @@ void ShowWebAppProtocolHandlerIntentPicker(
 #endif  // !defined(OS_ANDROID)
 
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 // Callback that runs when the Web App URL Handler Intent Picker dialog is
 // closed. `accepted` is true when the dialog is accepted, false otherwise.
 // `launch_params` contains information of the app that is selected to open by
