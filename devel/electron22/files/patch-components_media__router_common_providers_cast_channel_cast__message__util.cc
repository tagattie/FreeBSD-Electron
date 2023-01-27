--- components/media_router/common/providers/cast/channel/cast_message_util.cc.orig	2023-01-26 11:40:13 UTC
+++ components/media_router/common/providers/cast/channel/cast_message_util.cc
@@ -170,7 +170,7 @@ int GetVirtualConnectPlatformValue() {
   return 4;
 #elif BUILDFLAG(IS_CHROMEOS_ASH)
   return 5;
-#elif BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#elif BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_BSD)
   return 6;
 #else
   return 0;
