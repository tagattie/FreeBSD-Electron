--- content/app/content_main.cc.orig	2021-11-21 11:49:08 UTC
+++ content/app/content_main.cc
@@ -62,7 +62,7 @@
 #include "base/posix/global_descriptors.h"
 #endif
 
-#if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
 #include "base/files/scoped_file.h"
 #endif
 
@@ -239,7 +239,7 @@ int RunContentProcess(const ContentMainParams& params,
 #endif
     base::EnableTerminationOnOutOfMemory();
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
     // The various desktop environments set this environment variable that
     // allows the dbus client library to connect directly to the bus. When this
     // variable is not set (test environments like xvfb-run), the dbus client
@@ -314,7 +314,7 @@ int RunContentProcess(const ContentMainParams& params,
     InitializeMac();
 #endif
 
-#if defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
     base::subtle::EnableFDOwnershipEnforcement(true);
 #endif
 
