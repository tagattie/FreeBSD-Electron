--- chrome/browser/ui/webui/ntp/app_launcher_handler.cc.orig	2021-10-08 06:25:42 UTC
+++ chrome/browser/ui/webui/ntp/app_launcher_handler.cc
@@ -1337,7 +1337,7 @@ void AppLauncherHandler::InstallOsHooks(const web_app:
   options.os_hooks[web_app::OsHookType::kRunOnOsLogin] = false;
   options.os_hooks[web_app::OsHookType::kUninstallationViaOsSettings] = true;
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   options.os_hooks[web_app::OsHookType::kUrlHandlers] = true;
 #else
   options.os_hooks[web_app::OsHookType::kUrlHandlers] = false;
