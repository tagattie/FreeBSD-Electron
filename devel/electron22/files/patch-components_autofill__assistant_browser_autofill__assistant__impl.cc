--- components/autofill_assistant/browser/autofill_assistant_impl.cc.orig	2023-01-26 11:40:12 UTC
+++ components/autofill_assistant/browser/autofill_assistant_impl.cc
@@ -161,7 +161,7 @@ void AutofillAssistantImpl::GetCapabilitiesByHashPrefi
   client_context.set_platform_type(ClientContextProto::PLATFORM_TYPE_ANDROID);
 #endif
 #if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_MAC) || \
-    BUILDFLAG(IS_WIN) || BUILDFLAG(IS_FUCHSIA)
+    BUILDFLAG(IS_WIN) || BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_BSD)
   client_context.set_platform_type(ClientContextProto::PLATFORM_TYPE_DESKTOP);
 #endif
 
