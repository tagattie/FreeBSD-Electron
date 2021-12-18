--- base/time/time.cc.orig	2021-10-08 06:25:34 UTC
+++ base/time/time.cc
@@ -4,12 +4,12 @@
 
 #include "base/time/time.h"
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 // time.h is a widely included header and its size impacts build time.
 // Try not to raise this limit unless necessary. See
 // https://chromium.googlesource.com/chromium/src/+/HEAD/docs/wmax_tokens.md
 #pragma clang max_tokens_here 390000
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
 
 #include <atomic>
 #include <cmath>
