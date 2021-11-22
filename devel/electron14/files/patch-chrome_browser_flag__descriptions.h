--- chrome/browser/flag_descriptions.h.orig	2021-09-14 01:51:50 UTC
+++ chrome/browser/flag_descriptions.h
@@ -22,9 +22,9 @@
 #include "printing/buildflags/buildflags.h"
 #include "third_party/blink/public/common/buildflags.h"
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "base/allocator/buildflags.h"
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 // This file declares strings used in chrome://flags. These messages are not
 // translated, because instead of end-users they target Chromium developers and
@@ -3079,7 +3079,7 @@ extern const char kInstallableInkDropDescription[];
 
 // Random platform combinations -----------------------------------------------
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 
 extern const char kEnableOopPrintDriversName[];
@@ -3094,10 +3094,10 @@ extern const char kWebuiFeedbackDescription[];
 extern const char kSettingsLandingPageRedesignName[];
 extern const char kSettingsLandingPageRedesignDescription[];
 
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS)
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
 extern const char kCommanderName[];
 extern const char kCommanderDescription[];
@@ -3108,7 +3108,7 @@ extern const char kDesktopRestructuredLanguageSettings
 extern const char kDesktopDetailedLanguageSettingsName[];
 extern const char kDesktopDetailedLanguageSettingsDescription[];
 
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
 #if defined(OS_CHROMEOS) || defined(OS_LINUX)
 #if BUILDFLAG(USE_TCMALLOC)
@@ -3127,10 +3127,10 @@ extern const char kWebShareName[];
 extern const char kWebShareDescription[];
 #endif  // defined(OS_WIN) || BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_MAC)
 
-#if defined(OS_LINUX) && defined(USE_OZONE)
+#if (defined(OS_LINUX) || defined(OS_BSD)) && defined(USE_OZONE)
 extern const char kUseOzonePlatformName[];
 extern const char kUseOzonePlatformDescription[];
-#endif  // defined(OS_LINUX) && defined(USE_OZONE)
+#endif  // (defined(OS_LINUX) || defined(OS_BSD)) && defined(USE_OZONE)
 
 // Feature flags --------------------------------------------------------------
 
@@ -3185,7 +3185,7 @@ extern const char kElasticOverscrollName[];
 extern const char kElasticOverscrollDescription[];
 #endif  // defined(OS_WIN) || defined(OS_ANDROID)
 
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || \
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD) || \
     defined(OS_MAC)
 extern const char kUIDebugToolsName[];
 extern const char kUIDebugToolsDescription[];
