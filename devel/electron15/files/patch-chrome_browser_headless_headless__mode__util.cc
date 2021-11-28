--- chrome/browser/headless/headless_mode_util.cc.orig	2021-10-08 06:25:39 UTC
+++ chrome/browser/headless/headless_mode_util.cc
@@ -9,7 +9,7 @@
 // Native headless is currently available only on Linux platform. More
 // platforms will be added soon, so avoid function level clutter by providing
 // stub implementations at the end of the file.
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 
 #include <cstdlib>
 #include <vector>
@@ -100,7 +100,7 @@ void SetHeadlessDisplayBounds() {
 
 }  // namespace headless
 
-#else  // defined(OS_LINUX)
+#else  // defined(OS_LINUX) || defined(OS_BSD)
 
 namespace headless {
 
@@ -114,4 +114,4 @@ void SetHeadlessDisplayBounds() {}
 
 }  // namespace headless
 
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
