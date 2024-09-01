--- chrome/browser/ui/webui/certificate_manager/client_cert_sources.h.orig	2024-08-14 20:54:41 UTC
+++ chrome/browser/ui/webui/certificate_manager/client_cert_sources.h
@@ -15,7 +15,7 @@ CreatePlatformClientCertSource();
 std::unique_ptr<CertificateManagerPageHandler::CertSource>
 CreatePlatformClientCertSource();
 
-#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 std::unique_ptr<CertificateManagerPageHandler::CertSource>
 CreateProvisionedClientCertSource(Profile* profile);
 #endif
