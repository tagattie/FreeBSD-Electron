--- electron/shell/browser/net/system_network_context_manager.cc.orig	2022-05-24 14:51:39 UTC
+++ electron/shell/browser/net/system_network_context_manager.cc
@@ -44,7 +44,7 @@
 #include "components/os_crypt/keychain_password_mac.h"
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include "components/os_crypt/key_storage_config_linux.h"
 #endif
 
