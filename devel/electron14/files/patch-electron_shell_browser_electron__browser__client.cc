--- electron/shell/browser/electron_browser_client.cc.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/browser/electron_browser_client.cc
@@ -175,7 +175,7 @@
 #include "content/public/common/child_process_host.h"
 #endif
 
-#if defined(OS_LINUX) && !defined(MAS_BUILD)
+#if defined(OS_LINUX) && !defined(MAS_BUILD) && !defined(OS_BSD)
 #include "base/debug/leak_annotations.h"
 #include "components/crash/content/browser/crash_handler_host_linux.h"
 #include "components/crash/core/app/breakpad_linux.h"  // nogncheck
