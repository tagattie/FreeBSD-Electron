--- services/device/public/cpp/device_features.h.orig	2026-03-13 16:54:03 UTC
+++ services/device/public/cpp/device_features.h
@@ -48,7 +48,7 @@ DEVICE_FEATURES_EXPORT bool IsOsLevelGeolocationPermis
 
 DEVICE_FEATURES_EXPORT bool IsOsLevelGeolocationPermissionSupportEnabled();
 
-#if BUILDFLAG(IS_ANDROID) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_ANDROID) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 DEVICE_FEATURES_EXPORT BASE_DECLARE_FEATURE(kAutomaticUsbDetach);
 #endif  // BUILDFLAG(IS_ANDROID) || BUILDFLAG(IS_LINUX)
 
