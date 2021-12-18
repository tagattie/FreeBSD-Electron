--- chrome/browser/browser_process_impl.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/browser_process_impl.cc
@@ -220,7 +220,7 @@
 #include "chrome/browser/chromeos/extensions/telemetry/chromeos_telemetry_extensions_browser_api_provider.h"
 #endif
 
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 // How often to check if the persistent instance of Chrome needs to restart
 // to install an update.
 static const int kUpdateCheckIntervalHours = 6;
@@ -1438,7 +1438,7 @@ void BrowserProcessImpl::Unpin() {
 // Mac is currently not supported.
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 
 bool BrowserProcessImpl::IsRunningInBackground() const {
   // Check if browser is in the background.
@@ -1507,5 +1507,5 @@ void BrowserProcessImpl::OnPendingRestartResult(
     RestartBackgroundInstance();
   }
 }
-#endif  // defined(OS_WIN) || (defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || (defined(OS_LINUX) || defined(OS_BSD) ||
         // BUILDFLAG(IS_CHROMEOS_LACROS))
