--- electron/shell/browser/electron_browser_main_parts.cc.orig	2020-05-18 21:17:08 UTC
+++ electron/shell/browser/electron_browser_main_parts.cc
@@ -8,7 +8,7 @@
 
 #include <utility>
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include <glib.h>  // for g_setenv()
 #endif
 
