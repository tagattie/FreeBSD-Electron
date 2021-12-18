--- chrome/browser/metrics/chrome_browser_main_extra_parts_metrics.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/metrics/chrome_browser_main_extra_parts_metrics.cc
@@ -62,12 +62,14 @@
 // of lacros-chrome is complete.
 #if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
 #include <gnu/libc-version.h>
+#endif
 
+#if (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
 #include "base/linux_util.h"
 #include "base/strings/string_split.h"
 #include "base/strings/string_util.h"
 #include "base/version.h"
-#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
 
 #if defined(USE_OZONE)
 #include "ui/events/devices/device_data_manager.h"
@@ -222,11 +224,13 @@ void RecordStartupMetrics() {
   base::UmaHistogramBoolean("Windows.ApplockerRunning", IsApplockerRunning());
 #endif  // defined(OS_WIN)
 
+#if !defined(OS_BSD)
   // TODO(crbug.com/1216328) Remove logging.
   LOG(ERROR) << "crbug.com/1216328: Checking Bluetooth availability started. "
                 "Please report if there is no report that this ends.";
   bluetooth_utility::ReportBluetoothAvailability();
   LOG(ERROR) << "crbug.com/1216328: Checking Bluetooth availability ended.";
+#endif
 
   // Record whether Chrome is the default browser or not.
   LOG(ERROR) << "crbug.com/1216328: Checking default browser status started. "
