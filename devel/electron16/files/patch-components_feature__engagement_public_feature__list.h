--- components/feature_engagement/public/feature_list.h.orig	2021-11-19 04:25:13 UTC
+++ components/feature_engagement/public/feature_list.h
@@ -189,7 +189,7 @@ DEFINE_VARIATION_PARAM(kIPHDiscoverFeedHeaderFeature,
                        "IPH_DiscoverFeedHeaderMenu");
 #endif  // defined(OS_IOS)
 
-#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 DEFINE_VARIATION_PARAM(kIPHDesktopTabGroupsNewGroupFeature,
                        "IPH_DesktopTabGroupsNewGroup");
@@ -213,7 +213,7 @@ DEFINE_VARIATION_PARAM(kIPHDesktopPwaInstallFeature, "
 DEFINE_VARIATION_PARAM(kIPHProfileSwitchFeature, "IPH_ProfileSwitch");
 DEFINE_VARIATION_PARAM(kIPHUpdatedConnectionSecurityIndicatorsFeature,
                        "IPH_UpdatedConnectionSecurityIndicators");
-#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
 }  // namespace
@@ -309,7 +309,7 @@ constexpr flags_ui::FeatureEntry::FeatureVariation
         VARIATION_ENTRY(kIPHReadingListMessagesFeature),
         VARIATION_ENTRY(kIPHBadgedTranslateManualTriggerFeature),
         VARIATION_ENTRY(kIPHDiscoverFeedHeaderFeature),
-#elif defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#elif defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
         VARIATION_ENTRY(kIPHDesktopTabGroupsNewGroupFeature),
         VARIATION_ENTRY(kIPHFocusModeFeature),
@@ -327,7 +327,7 @@ constexpr flags_ui::FeatureEntry::FeatureVariation
         VARIATION_ENTRY(kIPHDesktopPwaInstallFeature),
         VARIATION_ENTRY(kIPHProfileSwitchFeature),
         VARIATION_ENTRY(kIPHUpdatedConnectionSecurityIndicatorsFeature),
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 };
 
