--- components/startup_metric_utils/browser/startup_metric_utils.cc.orig	2023-01-26 11:40:13 UTC
+++ components/startup_metric_utils/browser/startup_metric_utils.cc
@@ -311,7 +311,7 @@ base::TimeTicks StartupTimeToTimeTicks(base::Time time
 // Enabling this logic on OS X causes a significant performance regression.
 // TODO(crbug.com/601270): Remove IS_APPLE ifdef once priority changes are
 // ignored on Mac main thread.
-#if !BUILDFLAG(IS_APPLE)
+#if !BUILDFLAG(IS_APPLE) && !BUILDFLAG(IS_BSD)
   static bool statics_initialized = false;
   if (!statics_initialized) {
     statics_initialized = true;
