--- services/device/public/cpp/device_features.cc.orig	2026-03-13 16:54:03 UTC
+++ services/device/public/cpp/device_features.cc
@@ -120,7 +120,7 @@ BASE_FEATURE(kAutomaticUsbDetach, base::FEATURE_ENABLE
 // a USB interface is busy.
 #if BUILDFLAG(IS_ANDROID)
 BASE_FEATURE(kAutomaticUsbDetach, base::FEATURE_ENABLED_BY_DEFAULT);
-#elif BUILDFLAG(IS_LINUX)
+#elif BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 BASE_FEATURE(kAutomaticUsbDetach, base::FEATURE_DISABLED_BY_DEFAULT);
 #endif  // BUILDFLAG(IS_ANDROID)
 
