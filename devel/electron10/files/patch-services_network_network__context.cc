--- services/network/network_context.cc.orig	2021-01-23 02:30:44 UTC
+++ services/network/network_context.cc
@@ -1865,7 +1865,7 @@ URLRequestContextOwner NetworkContext::MakeURLRequestC
     temp_verifier = base::WrapUnique(cert_verifier_with_trust_anchors_);
 #endif  // defined(OS_CHROMEOS)
     if (!temp_verifier) {
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
       temp_verifier = std::make_unique<net::MultiThreadedCertVerifier>(
           net::CertVerifyProc::CreateSystemVerifyProc(std::move(cert_net_fetcher_)));
 #else
@@ -1926,7 +1926,7 @@ URLRequestContextOwner NetworkContext::MakeURLRequestC
 
     net::CookieCryptoDelegate* crypto_delegate = nullptr;
     if (params_->enable_encrypted_cookies) {
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS) && !BUILDFLAG(IS_CHROMECAST)
+#if (defined(OS_LINUX) || defined(OS_BSD)) && !defined(OS_CHROMEOS) && !BUILDFLAG(IS_CHROMECAST)
       DCHECK(network_service_->os_crypt_config_set())
           << "NetworkService::SetCryptConfig must be called before creating a "
              "NetworkContext with encrypted cookies.";
