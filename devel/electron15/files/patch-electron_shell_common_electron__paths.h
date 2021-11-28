--- electron/shell/common/electron_paths.h.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/common/electron_paths.h
@@ -29,7 +29,7 @@ enum {
   DIR_RECENT,  // Directory where recent files live
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   DIR_APP_DATA,  // Application Data directory under the user profile.
 #endif
 
@@ -37,7 +37,7 @@ enum {
 
   PATH_END,  // End of new paths. Those that follow redirect to base::DIR_*
 
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
   DIR_APP_DATA = base::DIR_APP_DATA,
 #endif
 };
