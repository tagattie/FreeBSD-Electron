--- chrome/test/base/chrome_test_launcher.cc.orig	2020-05-26 07:48:17 UTC
+++ chrome/test/base/chrome_test_launcher.cc
@@ -61,7 +61,7 @@
 #endif
 
 #if defined(OS_WIN) || defined(OS_MACOSX) || \
-    (defined(OS_LINUX) && !defined(OS_CHROMEOS))
+    (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
 #include "chrome/browser/first_run/scoped_relaunch_chrome_browser_override.h"
 #include "chrome/browser/upgrade_detector/installed_version_poller.h"
 #include "testing/gtest/include/gtest/gtest.h"
@@ -231,7 +231,7 @@ int LaunchChromeTests(size_t parallel_jobs,
   }
 
 #if defined(OS_WIN) || defined(OS_MACOSX) || \
-    (defined(OS_LINUX) && !defined(OS_CHROMEOS))
+    (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
   // Cause a test failure for any test that triggers an unexpected relaunch.
   // Tests that fail here should likely be restructured to put the "before
   // relaunch" code into a PRE_ test with its own
