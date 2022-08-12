--- components/autofill_assistant/browser/client_context.cc.orig	2022-08-01 19:04:26 UTC
+++ components/autofill_assistant/browser/client_context.cc
@@ -20,7 +20,7 @@ ClientContextImpl::ClientContextImpl(const Client* cli
   proto_.set_platform_type(ClientContextProto::PLATFORM_TYPE_ANDROID);
 #endif
 #if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_MAC) || \
-    BUILDFLAG(IS_WIN) || BUILDFLAG(IS_FUCHSIA)
+    BUILDFLAG(IS_WIN) || BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_BSD)
   proto_.set_platform_type(ClientContextProto::PLATFORM_TYPE_DESKTOP);
 #endif
 
