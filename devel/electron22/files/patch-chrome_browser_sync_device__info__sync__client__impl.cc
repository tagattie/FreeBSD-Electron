--- chrome/browser/sync/device_info_sync_client_impl.cc.orig	2023-01-26 11:40:11 UTC
+++ chrome/browser/sync/device_info_sync_client_impl.cc
@@ -42,7 +42,7 @@ std::string DeviceInfoSyncClientImpl::GetSigninScopedD
 // in lacros-chrome once build flag switch of lacros-chrome is
 // complete.
 #if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || \
-    (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_BSD))
   syncer::SyncPrefs prefs(profile_->GetPrefs());
   if (prefs.IsLocalSyncEnabled()) {
     return "local_device";
