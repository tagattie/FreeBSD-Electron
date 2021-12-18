--- chrome/browser/web_applications/externally_managed_app_install_task.cc.orig	2021-11-19 04:25:10 UTC
+++ chrome/browser/web_applications/externally_managed_app_install_task.cc
@@ -305,7 +305,7 @@ void ExternallyManagedAppInstallTask::OnWebAppInstalle
   options.os_hooks[OsHookType::kProtocolHandlers] = true;
   options.os_hooks[OsHookType::kUninstallationViaOsSettings] = true;
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   options.os_hooks[OsHookType::kUrlHandlers] = true;
 #else
   options.os_hooks[OsHookType::kUrlHandlers] = false;
