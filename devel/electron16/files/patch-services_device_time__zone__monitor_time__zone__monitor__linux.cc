--- services/device/time_zone_monitor/time_zone_monitor_linux.cc.orig	2021-11-19 04:25:21 UTC
+++ services/device/time_zone_monitor/time_zone_monitor_linux.cc
@@ -127,7 +127,11 @@ class TimeZoneMonitorLinuxImpl
     // false positives are harmless, assuming the false positive rate is
     // reasonable.
     const char* const kFilesToWatch[] = {
+#if defined(OS_BSD)
+        "/etc/localtime",
+#else
         "/etc/localtime", "/etc/timezone", "/etc/TZ",
+#endif
     };
     for (size_t index = 0; index < base::size(kFilesToWatch); ++index) {
       file_path_watchers_.push_back(std::make_unique<base::FilePathWatcher>());
