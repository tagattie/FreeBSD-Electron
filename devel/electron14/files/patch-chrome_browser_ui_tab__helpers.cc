--- chrome/browser/ui/tab_helpers.cc.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/ui/tab_helpers.cc
@@ -157,7 +157,7 @@
 #include "chrome/browser/lacros/web_contents_can_go_back_observer.h"
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 #include "chrome/browser/ui/blocked_content/framebust_block_tab_helper.h"
 #include "chrome/browser/ui/hats/hats_helper.h"
@@ -426,11 +426,11 @@ void TabHelpers::AttachTabHelpers(WebContents* web_con
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   metrics::DesktopSessionDurationObserver::CreateForWebContents(web_contents);
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   if (base::FeatureList::IsEnabled(
           features::kHappinessTrackingSurveysForDesktopDemo) ||
