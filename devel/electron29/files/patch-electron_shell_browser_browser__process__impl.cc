--- electron/shell/browser/browser_process_impl.cc.orig	2024-02-21 16:26:48 UTC
+++ electron/shell/browser/browser_process_impl.cc
@@ -316,7 +316,7 @@ const std::string& BrowserProcessImpl::GetSystemLocale
   return system_locale_;
 }
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 void BrowserProcessImpl::SetLinuxStorageBackend(
     os_crypt::SelectedLinuxBackend selected_backend) {
   switch (selected_backend) {
@@ -340,7 +340,7 @@ void BrowserProcessImpl::SetLinuxStorageBackend(
       break;
   }
 }
-#endif  // BUILDFLAG(IS_LINUX)
+#endif  // BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 
 void BrowserProcessImpl::SetApplicationLocale(const std::string& locale) {
   locale_ = locale;
