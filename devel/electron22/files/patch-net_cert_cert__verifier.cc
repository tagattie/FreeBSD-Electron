--- net/cert/cert_verifier.cc.orig	2023-01-26 11:40:21 UTC
+++ net/cert/cert_verifier.cc
@@ -87,7 +87,7 @@ std::unique_ptr<CertVerifier> CertVerifier::CreateDefa
   }
 #endif
   if (!verify_proc) {
-#if BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
     verify_proc =
         CertVerifyProc::CreateBuiltinVerifyProc(std::move(cert_net_fetcher));
 #else
