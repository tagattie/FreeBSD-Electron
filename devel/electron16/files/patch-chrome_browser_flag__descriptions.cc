--- chrome/browser/flag_descriptions.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/flag_descriptions.cc
@@ -5270,7 +5270,7 @@ const char kDownloadShelfWebUIDescription[] =
 
 // Random platform combinations -----------------------------------------------
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
 const char kWebUIBrandingUpdateName[] = "WebUI Branding Update";
@@ -5288,10 +5288,10 @@ const char kSettingsLandingPageRedesignDescription[] =
     "Changes the layout of the chrome://settings page to only show one section "
     "at a time.";
 
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
 const char kCommanderName[] = "Commander";
 const char kCommanderDescription[] =
@@ -5307,16 +5307,16 @@ const char kDesktopDetailedLanguageSettingsName[] =
 const char kDesktopDetailedLanguageSettingsDescription[] =
     "Enable the new detailed language settings page";
 
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
 
-#if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
 #if BUILDFLAG(USE_TCMALLOC)
 const char kDynamicTcmallocName[] = "Dynamic Tcmalloc Tuning";
 const char kDynamicTcmallocDescription[] =
     "Allows tcmalloc to dynamically adjust tunables based on system resource "
     "utilization.";
 #endif  // BUILDFLAG(USE_TCMALLOC)
-#endif  // #if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#endif  // #if defined(OS_CHROMEOS) || defined(OS_LINU) || defined(OS_BSD)
 
 #if !defined(OS_ANDROID) && !BUILDFLAG(IS_CHROMEOS_ASH)
 const char kUserDataSnapshotName[] = "Enable user data snapshots";
@@ -5436,7 +5436,7 @@ const char kElasticOverscrollDescription[] =
     "Enables Elastic Overscrolling on touchscreens and precision touchpads.";
 #endif  // defined(OS_WIN) || defined(OS_ANDROID)
 
-#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || \
+#if defined(OS_WIN) || (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD) || \
     defined(OS_MAC)
 const char kUIDebugToolsName[] = "Debugging tools for UI";
 const char kUIDebugToolsDescription[] =
