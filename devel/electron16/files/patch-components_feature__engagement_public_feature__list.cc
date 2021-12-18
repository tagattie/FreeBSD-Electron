--- components/feature_engagement/public/feature_list.cc.orig	2021-11-19 04:25:13 UTC
+++ components/feature_engagement/public/feature_list.cc
@@ -102,7 +102,7 @@ const base::Feature* const kAllFeatures[] = {
     &kIPHBadgedTranslateManualTriggerFeature,
     &kIPHDiscoverFeedHeaderFeature,
 #endif  // defined(OS_IOS)
-#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
     &kIPHDesktopTabGroupsNewGroupFeature,
     &kIPHFocusModeFeature,
@@ -120,7 +120,7 @@ const base::Feature* const kAllFeatures[] = {
     &kIPHDesktopPwaInstallFeature,
     &kIPHProfileSwitchFeature,
     &kIPHUpdatedConnectionSecurityIndicatorsFeature,
-#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 };
 }  // namespace
