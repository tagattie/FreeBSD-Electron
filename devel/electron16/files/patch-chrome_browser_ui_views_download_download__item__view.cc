--- chrome/browser/ui/views/download/download_item_view.cc.orig	2021-11-19 04:25:10 UTC
+++ chrome/browser/ui/views/download/download_item_view.cc
@@ -194,7 +194,7 @@ bool UseNewWarnings() {
 }
 
 int GetFilenameStyle(const views::Label& label) {
-#if !defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if !defined(OS_LINUX) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
   if (UseNewWarnings())
     return STYLE_EMPHASIZED;
 #endif
@@ -202,7 +202,7 @@ int GetFilenameStyle(const views::Label& label) {
 }
 
 int GetFilenameStyle(const views::StyledLabel& label) {
-#if !defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if !defined(OS_LINUX) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
   if (UseNewWarnings())
     return STYLE_EMPHASIZED;
 #endif
