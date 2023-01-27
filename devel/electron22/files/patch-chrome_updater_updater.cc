--- chrome/updater/updater.cc.orig	2023-01-26 11:40:12 UTC
+++ chrome/updater/updater.cc
@@ -44,7 +44,7 @@
 #include "chrome/updater/win/win_util.h"
 #elif BUILDFLAG(IS_MAC)
 #include "chrome/updater/app/server/mac/server.h"
-#elif BUILDFLAG(IS_LINUX)
+#elif BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 #include "chrome/updater/app/server/linux/server.h"
 #endif
 
