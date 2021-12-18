--- chrome/browser/flag_descriptions.h.orig	2021-11-19 04:25:08 UTC
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
@@ -3043,7 +3043,7 @@ extern const char kDownloadShelfWebUIDescription[];
 
 // Random platform combinations -----------------------------------------------
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
 extern const char kWebUIBrandingUpdateName[];
@@ -3055,10 +3055,10 @@ extern const char kWebuiFeedbackDescription[];
 extern const char kSettingsLandingPageRedesignName[];
 extern const char kSettingsLandingPageRedesignDescription[];
 
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
 extern const char kCommanderName[];
 extern const char kCommanderDescription[];
@@ -3069,14 +3069,14 @@ extern const char kDesktopRestructuredLanguageSettings
 extern const char kDesktopDetailedLanguageSettingsName[];
 extern const char kDesktopDetailedLanguageSettingsDescription[];
 
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
-#if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
 #if BUILDFLAG(USE_TCMALLOC)
 extern const char kDynamicTcmallocName[];
 extern const char kDynamicTcmallocDescription[];
 #endif  // BUILDFLAG(USE_TCMALLOC)
-#endif  // #if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#endif  // #if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
 
 #if !defined(OS_ANDROID) && !BUILDFLAG(IS_CHROMEOS_ASH)
 extern const char kUserDataSnapshotName[];
@@ -3158,7 +3158,7 @@ extern const char kElasticOverscrollName[];
 extern const char kElasticOverscrollDescription[];
 #endif  // defined(OS_WIN) || defined(OS_ANDROID)
 
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || \
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD) || \
     defined(OS_MAC)
 extern const char kUIDebugToolsName[];
 extern const char kUIDebugToolsDescription[];
