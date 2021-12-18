--- chrome/browser/about_flags.cc.orig	2021-11-19 04:25:07 UTC
+++ chrome/browser/about_flags.cc
@@ -206,7 +206,7 @@
 #include "ui/native_theme/native_theme_features.h"
 #include "ui/ui_features.h"
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "base/allocator/buildflags.h"
 #endif
 
@@ -959,7 +959,7 @@ const FeatureEntry::FeatureVariation kPageContentAnnot
      base::size(kPageContentAnnotationsParams), nullptr},
 };
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || \
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD) || \
     defined(OS_WIN)
 const FeatureEntry::FeatureParam kOmniboxDocumentProviderServerScoring[] = {
     {"DocumentUseServerScore", "true"},
@@ -1157,7 +1157,7 @@ const FeatureEntry::FeatureVariation kOmniboxBookmarkP
     {"Dynamic Replace URL (Title - Path|URL)",
      kOmniboxBookmarkPathsDynamicReplaceUrl,
      base::size(kOmniboxBookmarkPathsDynamicReplaceUrl), nullptr}};
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) ||
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD) ||
         // defined(OS_WIN)
 
 const FeatureEntry::FeatureVariation
@@ -2481,7 +2481,7 @@ const FeatureEntry::FeatureVariation kPasswordChangeFe
      nullptr}};
 #endif  // defined(OS_ANDROID)
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 const FeatureEntry::FeatureParam
     kSendWebUIJavaScriptErrorReportsVariationSendToStaging[] = {
         {features::kSendWebUIJavaScriptErrorReportsSendToProductionVariation,
@@ -2786,7 +2786,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kWebKioskEnableLacrosDescription, kOsCrOS,
      FEATURE_VALUE_TYPE(features::kWebKioskEnableLacros)},
 #endif  // BUILDFLAG(IS_CHROMEOS_ASH)
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
     {"send-webui-javascript-error-reports",
      flag_descriptions::kSendWebUIJavaScriptErrorReportsName,
      flag_descriptions::kSendWebUIJavaScriptErrorReportsDescription,
@@ -3241,7 +3241,7 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(media::kDeprecateLowUsageCodecs)},
 #endif  // defined(OS_CHROMEOS)
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
     {
         "enable-accelerated-video-decode",
         flag_descriptions::kAcceleratedVideoDecodeName,
@@ -3259,7 +3259,7 @@ const FeatureEntry kFeatureEntries[] = {
         kOsMac | kOsWin | kOsCrOS | kOsAndroid | kOsLinux,
         SINGLE_DISABLE_VALUE_TYPE(switches::kDisableAcceleratedVideoDecode),
     },
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
     {
         "disable-accelerated-video-encode",
         flag_descriptions::kAcceleratedVideoEncodeName,
@@ -3583,7 +3583,7 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(performance_manager::features::kDynamicTcmallocTuning)},
 #endif  // BUILDFLAG(USE_TCMALLOC)
 #endif  // BUILDFLAG(IS_CHROMEOS_ASH)
-#if (defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_ANDROID)) && \
+#if (defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_ANDROID) || defined(OS_BSD)) && \
     !defined(OS_NACL)
     {"mojo-linux-sharedmem", flag_descriptions::kMojoLinuxChannelSharedMemName,
      flag_descriptions::kMojoLinuxChannelSharedMemDescription,
@@ -3622,7 +3622,7 @@ const FeatureEntry kFeatureEntries[] = {
     {"enable-login-detection", flag_descriptions::kEnableLoginDetectionName,
      flag_descriptions::kEnableLoginDetectionDescription, kOsAll,
      FEATURE_VALUE_TYPE(login_detection::kLoginDetection)},
-#if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
     {"enable-save-data", flag_descriptions::kEnableSaveDataName,
      flag_descriptions::kEnableSaveDataDescription, kOsCrOS | kOsLinux,
      SINGLE_VALUE_TYPE(
@@ -3632,7 +3632,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kEnableNavigationPredictorDescription,
      kOsCrOS | kOsLinux,
      FEATURE_VALUE_TYPE(blink::features::kNavigationPredictor)},
-#endif  // BUILDFLAG(IS_CHROMEOS_ASH) || OS_LINUX
+#endif  // BUILDFLAG(IS_CHROMEOS_ASH) || OS_LINUX || OS_BSD
     {"enable-preconnect-to-search",
      flag_descriptions::kEnablePreconnectToSearchName,
      flag_descriptions::kEnablePreconnectToSearchDescription, kOsAll,
@@ -4484,7 +4484,7 @@ const FeatureEntry kFeatureEntries[] = {
      kOsAll,
      FEATURE_VALUE_TYPE(omnibox::kOmniboxTrendingZeroPrefixSuggestionsOnNTP)},
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || \
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD) || \
     defined(OS_WIN)
     {"omnibox-experimental-keyword-mode",
      flag_descriptions::kOmniboxExperimentalKeywordModeName,
@@ -4593,7 +4593,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kOmniboxPreserveLongerShortcutsTextName,
      flag_descriptions::kOmniboxPreserveLongerShortcutsTextDescription,
      kOsDesktop, FEATURE_VALUE_TYPE(omnibox::kPreserveLongerShortcutsText)},
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) ||
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD) ||
         // defined(OS_WIN)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
@@ -4857,12 +4857,12 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(chrome::android::kReaderModeInCCT)},
 #endif  // !defined(OS_ANDROID)
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
     {"webui-feedback", flag_descriptions::kWebuiFeedbackName,
      flag_descriptions::kWebuiFeedbackDescription, kOsDesktop,
      FEATURE_VALUE_TYPE(features::kWebUIFeedback)},
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS)
 
 #if !defined(OS_ANDROID)
@@ -5486,7 +5486,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kSharingSendViaSyncDescription, kOsAll,
      FEATURE_VALUE_TYPE(kSharingSendViaSync)},
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
     {"sharing-hub-desktop-app-menu",
      flag_descriptions::kSharingHubDesktopAppMenuName,
      flag_descriptions::kSharingHubDesktopAppMenuDescription, kOsDesktop,
@@ -5495,7 +5495,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kSharingHubDesktopOmniboxName,
      flag_descriptions::kSharingHubDesktopOmniboxDescription, kOsDesktop,
      FEATURE_VALUE_TYPE(sharing_hub::kSharingHubDesktopOmnibox)},
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
     {"ash-enable-pip-rounded-corners",
@@ -5963,7 +5963,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kMouseSubframeNoImplicitCaptureDescription, kOsAll,
      FEATURE_VALUE_TYPE(features::kMouseSubframeNoImplicitCapture)},
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
     {"global-media-controls", flag_descriptions::kGlobalMediaControlsName,
      flag_descriptions::kGlobalMediaControlsDescription,
@@ -5992,7 +5992,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kGlobalMediaControlsSeamlessTransferDescription,
      kOsWin | kOsMac | kOsLinux,
      FEATURE_VALUE_TYPE(media::kGlobalMediaControlsSeamlessTransfer)},
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
         // defined(OS_CHROMEOS)
 
     {"safety-tips", flag_descriptions::kSafetyTipName,
@@ -6745,7 +6745,7 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(chrome::android::kIncognitoReauthenticationForAndroid)},
 #endif
 
-#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || \
+#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
     {"incognito-brand-consistency-for-desktop",
      flag_descriptions::kIncognitoBrandConsistencyForDesktopName,
@@ -6764,7 +6764,7 @@ const FeatureEntry kFeatureEntries[] = {
      flag_descriptions::kInheritNativeThemeFromParentWidgetDescription,
      kOsDesktop,
      FEATURE_VALUE_TYPE(views::features::kInheritNativeThemeFromParentWidget)},
-#endif  // defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) ||
+#endif  // defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
     {"consolidated-site-storage-controls",
@@ -6878,7 +6878,7 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(language::kForceAppLanguagePrompt)},
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
     {"commander", flag_descriptions::kCommanderName,
      flag_descriptions::kCommanderDescription, kOsDesktop,
      FEATURE_VALUE_TYPE(features::kCommander)},
@@ -7124,7 +7124,7 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(media::kVaapiVp9kSVCHWEncoding)},
 #endif  // defined(ARCH_CPU_X86_FAMILY) && BUILDFLAG(IS_CHROMEOS_ASH)
 
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || \
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD) || \
     defined(OS_MAC)
     {
         "ui-debug-tools",
@@ -7268,7 +7268,7 @@ const FeatureEntry kFeatureEntries[] = {
      FEATURE_VALUE_TYPE(chromeos::features::kLauncherAppSort)},
 #endif
 
-#if BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC) || defined(OS_LINUX)
+#if BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
     {"enable-desktop-pwas-app-icon-shortcuts-menu-ui",
      flag_descriptions::kDesktopPWAsAppIconShortcutsMenuUIName,
      flag_descriptions::kDesktopPWAsAppIconShortcutsMenuUIDescription,
@@ -7512,7 +7512,7 @@ const FeatureEntry kFeatureEntries[] = {
          ash::features::kHoldingSpaceInProgressDownloadsIntegration)},
 #endif
 
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || \
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD) || \
     defined(OS_MAC) || (defined(OS_ANDROID))
     {"omnibox-updated-connection-security-indicators",
      flag_descriptions::kOmniboxUpdatedConnectionSecurityIndicatorsName,
