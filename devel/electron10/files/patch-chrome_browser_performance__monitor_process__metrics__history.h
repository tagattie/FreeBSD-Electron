--- chrome/browser/performance_monitor/process_metrics_history.h.orig	2020-09-21 18:39:08 UTC
+++ chrome/browser/performance_monitor/process_metrics_history.h
@@ -71,7 +71,7 @@ class ProcessMetricsHistory {
   uint64_t disk_usage_ = 0;
 #endif
 
-#if defined(OS_MACOSX) || defined(OS_LINUX) || defined(OS_AIX)
+#if defined(OS_MACOSX) || defined(OS_LINUX) || defined(OS_AIX) || defined(OS_BSD)
   int idle_wakeups_ = 0;
 #endif
 #if defined(OS_MACOSX)
