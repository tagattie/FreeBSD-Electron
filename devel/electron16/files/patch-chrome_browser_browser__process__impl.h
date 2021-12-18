--- chrome/browser/browser_process_impl.h.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/browser_process_impl.h
@@ -378,7 +378,7 @@ class BrowserProcessImpl : public BrowserProcess,
 
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   base::RepeatingTimer autoupdate_timer_;
 
   // Gets called by autoupdate timer to see if browser needs restart and can be
@@ -387,7 +387,7 @@ class BrowserProcessImpl : public BrowserProcess,
   bool IsRunningInBackground() const;
   void OnPendingRestartResult(bool is_update_pending_restart);
   void RestartBackgroundInstance();
-#endif  // defined(OS_WIN) || (defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || (defined(OS_LINUX) || defined(OS_BSD) ||
         // BUILDFLAG(IS_CHROMEOS_LACROS))
 
   // component updater is normally not used under ChromeOS due
