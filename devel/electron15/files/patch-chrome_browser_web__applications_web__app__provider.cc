--- chrome/browser/web_applications/web_app_provider.cc.orig	2021-10-08 06:25:42 UTC
+++ chrome/browser/web_applications/web_app_provider.cc
@@ -273,7 +273,7 @@ void WebAppProvider::CreateWebAppsSubsystems(Profile* 
 
     std::unique_ptr<UrlHandlerManager> url_handler_manager;
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
     url_handler_manager = std::make_unique<UrlHandlerManagerImpl>(profile);
 #endif
 
