--- chrome/browser/metrics/chrome_metrics_service_client.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/metrics/chrome_metrics_service_client.cc
@@ -743,10 +743,10 @@ void ChromeMetricsServiceClient::RegisterMetricsServic
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   metrics_service_->RegisterMetricsProvider(
       std::make_unique<DesktopPlatformFeaturesMetricsProvider>());
-#endif  // defined(OS_WIN) || defined(OS_MAC) || (defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || (defined(OS_LINUX) || defined(OS_BSD) ||
         // BUILDFLAG(IS_CHROMEOS_LACROS))
 
 #if BUILDFLAG(ENABLE_PLUGINS)
@@ -841,10 +841,10 @@ void ChromeMetricsServiceClient::RegisterMetricsServic
       std::make_unique<PowerMetricsProvider>());
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
   metrics_service_->RegisterMetricsProvider(
       metrics::CreateDesktopSessionMetricsProvider());
-#endif  // defined(OS_WIN) || defined(OS_MAC) || (defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MAC) || (defined(OS_LINUX) || defined(OS_BSD)
 }
 
 void ChromeMetricsServiceClient::RegisterUKMProviders() {
@@ -1018,7 +1018,7 @@ bool ChromeMetricsServiceClient::RegisterForProfileEve
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   // This creates the DesktopProfileSessionDurationsServices if it didn't exist
   // already.
   metrics::DesktopProfileSessionDurationsServiceFactory::GetForBrowserContext(
