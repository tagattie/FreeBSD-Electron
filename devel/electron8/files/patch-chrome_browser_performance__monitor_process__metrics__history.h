--- chrome/browser/performance_monitor/process_metrics_history.h.orig	2020-03-03 07:02:29 UTC
+++ chrome/browser/performance_monitor/process_metrics_history.h
@@ -72,7 +72,7 @@ class ProcessMetricsHistory {
   uint64_t disk_usage_ = 0;
 #endif
 
-#if defined(OS_MACOSX) || defined(OS_LINUX) || defined(OS_AIX)
+#if defined(OS_MACOSX) || defined(OS_LINUX) || defined(OS_AIX) || defined(OS_BSD)
   int idle_wakeups_ = 0;
 #endif
 #if defined(OS_MACOSX)
