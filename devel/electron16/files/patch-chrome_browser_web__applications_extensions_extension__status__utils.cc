--- chrome/browser/web_applications/extensions/extension_status_utils.cc.orig	2021-11-19 04:25:10 UTC
+++ chrome/browser/web_applications/extensions/extension_status_utils.cc
@@ -76,7 +76,7 @@ bool IsExternalExtensionUninstalled(content::BrowserCo
   return prefs && prefs->IsExternalExtensionUninstalled(extension_id);
 }
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 bool IsExtensionUnsupportedDeprecatedApp(content::BrowserContext* context,
                                          const std::string& extension_id) {
   if (!base::FeatureList::IsEnabled(features::kChromeAppsDeprecation))
