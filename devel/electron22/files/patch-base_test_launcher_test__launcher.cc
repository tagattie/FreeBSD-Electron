--- base/test/launcher/test_launcher.cc.orig	2023-01-26 11:40:09 UTC
+++ base/test/launcher/test_launcher.cc
@@ -65,6 +65,7 @@
 #include "third_party/libxml/chromium/libxml_utils.h"
 
 #if BUILDFLAG(IS_POSIX)
+#include <signal.h>
 #include <fcntl.h>
 
 #include "base/files/file_descriptor_watcher_posix.h"
