--- chrome/browser/web_applications/extensions/bookmark_app_finalizer_utils.cc.orig	2020-09-21 18:39:10 UTC
+++ chrome/browser/web_applications/extensions/bookmark_app_finalizer_utils.cc
@@ -15,7 +15,7 @@ namespace {
 
 #if !defined(OS_CHROMEOS)
 bool CanOsAddDesktopShortcuts() {
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
   return true;
 #else
   return false;
