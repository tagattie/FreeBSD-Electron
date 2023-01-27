--- net/cert/test_root_certs_unittest.cc.orig	2023-01-26 11:40:21 UTC
+++ net/cert/test_root_certs_unittest.cc
@@ -39,7 +39,7 @@ scoped_refptr<CertVerifyProc> CreateCertVerifyProc() {
         /*cert_net_fetcher=*/nullptr);
   }
 #endif
-#if BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
   return CertVerifyProc::CreateBuiltinVerifyProc(/*cert_net_fetcher=*/nullptr);
 #else
   return CertVerifyProc::CreateSystemVerifyProc(/*cert_net_fetcher=*/nullptr);
