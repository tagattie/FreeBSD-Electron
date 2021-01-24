--- content/shell/browser/web_test/web_test_browser_context.cc.orig	2020-09-21 18:39:17 UTC
+++ content/shell/browser/web_test/web_test_browser_context.cc
@@ -26,7 +26,7 @@
 
 #if defined(OS_WIN)
 #include "base/base_paths_win.h"
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
 #include "base/nix/xdg_util.h"
 #elif defined(OS_MACOSX)
 #include "base/base_paths_mac.h"
