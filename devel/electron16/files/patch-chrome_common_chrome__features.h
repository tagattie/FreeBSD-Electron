--- chrome/common/chrome_features.h.orig	2021-12-14 11:45:00 UTC
+++ chrome/common/chrome_features.h
@@ -77,7 +77,7 @@ extern const base::Feature kAppShimNewCloseBehavior;
 
 COMPONENT_EXPORT(CHROME_FEATURES) extern const base::Feature kAsyncDns;
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kAutofillAddressSurvey;
@@ -87,10 +87,10 @@ COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kAutofillPasswordSurvey;
 #endif
 
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kBackgroundModeAllowRestart;
-#endif  // defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
 COMPONENT_EXPORT(CHROME_FEATURES) extern const base::Feature kBorealis;
@@ -104,7 +104,7 @@ extern const base::Feature kBrowserAppInstanceTracking
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kChangePictureVideoMode;
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kChromeAppsDeprecation;
 #endif
@@ -168,7 +168,7 @@ COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kDefaultPinnedAppsUpdate2021Q2;
 #endif
 
-#if BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC) || defined(OS_LINUX)
+#if BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kDesktopPWAsAppIconShortcutsMenuUI;
 #endif
@@ -390,7 +390,7 @@ extern const base::Feature kIncognitoBrandConsistencyF
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kIncognitoNtpRevamp;
 
-#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || \
+#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 COMPONENT_EXPORT(CHROME_FEATURES)
 extern const base::Feature kIncognitoBrandConsistencyForDesktop;
