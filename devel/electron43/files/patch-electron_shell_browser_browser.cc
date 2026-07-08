--- electron/shell/browser/browser.cc.orig	2026-06-29 20:35:15 UTC
+++ electron/shell/browser/browser.cc
@@ -97,7 +97,7 @@ bool Browser::IsValidProtocolScheme(const std::string&
   return true;
 }
 
-#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 void Browser::Focus(gin::Arguments* args) {
   // Focus on the first visible window.
   for (auto* const window : WindowList::GetWindows()) {
