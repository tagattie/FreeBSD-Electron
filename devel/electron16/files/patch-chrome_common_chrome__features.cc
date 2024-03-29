--- chrome/common/chrome_features.cc.orig	2021-12-14 11:45:00 UTC
+++ chrome/common/chrome_features.cc
@@ -93,7 +93,7 @@ const base::Feature kAsyncDns {
 #endif
 };
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 // Enables or disables the Autofill survey triggered by opening a prompt to
 // save address info.
@@ -109,13 +109,13 @@ const base::Feature kAutofillPasswordSurvey{"AutofillP
                                             base::FEATURE_DISABLED_BY_DEFAULT};
 #endif
 
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 // Enables the Restart background mode optimization. When all Chrome UI is
 // closed and it goes in the background, allows to restart the browser to
 // discard memory.
 const base::Feature kBackgroundModeAllowRestart{
     "BackgroundModeAllowRestart", base::FEATURE_DISABLED_BY_DEFAULT};
-#endif  // defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
 // Enable Borealis on Chrome OS.
@@ -131,13 +131,13 @@ const base::Feature kBrowserAppInstanceTracking{
 const base::Feature kChangePictureVideoMode{"ChangePictureVideoMode",
                                             base::FEATURE_ENABLED_BY_DEFAULT};
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 // Controls whether Chrome Apps are supported. See https://crbug.com/1221251.
 // If the feature is disabled, Chrome Apps continue to work. If enabled, Chrome
 // Apps will not launch and will be marked in the UI as deprecated.
 const base::Feature kChromeAppsDeprecation{"ChromeAppsDeprecation",
                                            base::FEATURE_DISABLED_BY_DEFAULT};
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
 const base::Feature kClientStorageAccessContextAuditing{
     "ClientStorageAccessContextAuditing", base::FEATURE_DISABLED_BY_DEFAULT};
@@ -242,7 +242,7 @@ const base::Feature kDefaultPinnedAppsUpdate2021Q2{
     "DefaultPinnedAppsUpdate2021Q2", base::FEATURE_ENABLED_BY_DEFAULT};
 #endif
 
-#if BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC) || defined(OS_LINUX)
+#if BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 // Enables Desktop PWAs shortcuts menu to be visible and executable in ChromeOS,
 // MacOS and Linux.
 const base::Feature kDesktopPWAsAppIconShortcutsMenuUI{
@@ -294,7 +294,7 @@ const base::Feature kDesktopPWAsNotificationIconAndTit
 // Enables or disables Desktop PWAs to be auto-started on OS login.
 const base::Feature kDesktopPWAsRunOnOsLogin {
   "DesktopPWAsRunOnOsLogin",
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
       base::FEATURE_ENABLED_BY_DEFAULT
 #else
       base::FEATURE_DISABLED_BY_DEFAULT
@@ -324,7 +324,7 @@ const base::Feature kDesktopPWAsWebBundles{"DesktopPWA
 const base::Feature kDnsOverHttps {
   "DnsOverHttps",
 #if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_MAC) || \
-    defined(OS_ANDROID) || defined(OS_LINUX)
+    defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_BSD)
       base::FEATURE_ENABLED_BY_DEFAULT
 #else
       base::FEATURE_DISABLED_BY_DEFAULT
@@ -346,7 +346,7 @@ const base::FeatureParam<bool> kDnsOverHttpsFallbackPa
 const base::FeatureParam<bool> kDnsOverHttpsShowUiParam {
   &kDnsOverHttps, "ShowUi",
 #if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_MAC) || \
-    defined(OS_ANDROID) || defined(OS_LINUX)
+    defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_BSD)
       true
 #else
       false
@@ -602,7 +602,7 @@ const base::Feature kIncognitoBrandConsistencyForAndro
 const base::Feature kIncognitoNtpRevamp{"IncognitoNtpRevamp",
                                         base::FEATURE_DISABLED_BY_DEFAULT};
 
-#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || \
+#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 // When enabled, removes any theme or background customization done by the user
 // on the Incognito UI.
