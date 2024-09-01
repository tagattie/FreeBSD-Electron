--- components/visited_url_ranking/public/url_visit_util.cc.orig	2024-08-14 20:54:58 UTC
+++ components/visited_url_ranking/public/url_visit_util.cc
@@ -62,7 +62,7 @@ PlatformType GetPlatformInput() {
   return PlatformType::kWindows;
 #elif BUILDFLAG(IS_MAC)
   return PlatformType::kMac;
-#elif BUILDFLAG(IS_LINUX)
+#elif BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   return PlatformType::kLinux;
 #elif BUILDFLAG(IS_IOS)
   return PlatformType::kIos;
