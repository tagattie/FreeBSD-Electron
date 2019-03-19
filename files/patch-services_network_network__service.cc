--- services/network/network_service.cc.orig	2019-03-16 09:15:20 UTC
+++ services/network/network_service.cc
@@ -38,7 +38,7 @@
 #include "third_party/boringssl/src/include/openssl/cpu.h"
 #endif
 
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS) && !defined(IS_CHROMECAST)
+#if (defined(OS_LINUX) && !defined(OS_CHROMEOS) && !defined(IS_CHROMECAST)) || defined(OS_BSD)
 #include "components/os_crypt/key_storage_config_linux.h"
 #include "components/os_crypt/os_crypt.h"
 #endif
@@ -371,7 +371,7 @@ void NetworkService::UpdateSignedTreeHead(const net::c
   sth_distributor_->NewSTHObserved(sth);
 }
 
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
 void NetworkService::SetCryptConfig(mojom::CryptConfigPtr crypt_config) {
 #if !defined(IS_CHROMECAST)
   DCHECK(!os_crypt_config_set_);
