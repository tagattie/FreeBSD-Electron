--- components/feature_engagement/public/feature_constants.h.orig	2021-09-14 01:51:54 UTC
+++ components/feature_engagement/public/feature_constants.h
@@ -16,7 +16,7 @@ extern const base::Feature kIPHDemoMode;
 // A feature to ensure all arrays can contain at least one feature.
 extern const base::Feature kIPHDummyFeature;
 
-#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 extern const base::Feature kIPHDesktopTabGroupsNewGroupFeature;
 extern const base::Feature kIPHFocusModeFeature;
@@ -32,7 +32,7 @@ extern const base::Feature kIPHDesktopSnoozeFeature;
 extern const base::Feature kIPHDesktopPwaInstallFeature;
 extern const base::Feature kIPHProfileSwitchFeature;
 extern const base::Feature kIPHUpdatedConnectionSecurityIndicatorsFeature;
-#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS)
 
 // All the features declared for Android below that are also used in Java,
@@ -123,7 +123,7 @@ extern const base::Feature kIPHBadgedTranslateManualTr
 extern const base::Feature kIPHDiscoverFeedHeaderFeature;
 #endif  // defined(OS_IOS)
 
-#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_ANDROID)
 extern const base::Feature kIPHUpdatedConnectionSecurityIndicatorsFeature;
 #endif
