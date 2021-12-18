--- remoting/base/host_settings.cc.orig	2021-11-19 04:25:20 UTC
+++ remoting/base/host_settings.cc
@@ -7,9 +7,9 @@
 #include "base/no_destructor.h"
 #include "build/build_config.h"
 
-#if defined(OS_APPLE) || (defined(OS_LINUX) && !defined(OS_CHROMEOS))
+#if defined(OS_APPLE) || (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
 #include "remoting/base/file_host_settings.h"
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
 
 #if defined(OS_WIN)
 #include "remoting/base/host_settings_win.h"
@@ -44,7 +44,7 @@ HostSettings::~HostSettings() = default;
 
 // static
 HostSettings* HostSettings::GetInstance() {
-#if defined(OS_APPLE) || (defined(OS_LINUX) && !defined(OS_CHROMEOS))
+#if defined(OS_APPLE) || (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
   static base::NoDestructor<FileHostSettings> instance(
       FileHostSettings::GetSettingsFilePath());
 #elif defined(OS_WIN)
