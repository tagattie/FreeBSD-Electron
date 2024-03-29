--- chrome/common/channel_info_posix.cc.orig	2021-09-14 01:51:52 UTC
+++ chrome/common/channel_info_posix.cc
@@ -93,7 +93,7 @@ std::string GetChannelSuffixForDataDir() {
 
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
 std::string GetDesktopName(base::Environment* env) {
 #if BUILDFLAG(GOOGLE_CHROME_BRANDING)
   // Google Chrome packaged as a snap is a special case: the application name
@@ -123,7 +123,7 @@ std::string GetDesktopName(base::Environment* env) {
   return "chromium-browser.desktop";
 #endif
 }
-#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
 
 version_info::Channel GetChannel() {
   return GetChannelImpl().channel;
