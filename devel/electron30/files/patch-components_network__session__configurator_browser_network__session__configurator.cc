--- components/network_session_configurator/browser/network_session_configurator.cc.orig	2024-04-15 20:33:54 UTC
+++ components/network_session_configurator/browser/network_session_configurator.cc
@@ -817,7 +817,7 @@ net::URLRequestContextBuilder::HttpCacheParams::Type C
   // backport, having it behave differently than in stable would be a bigger
   // problem. TODO: Does this work in later macOS releases?
 #if BUILDFLAG(IS_ANDROID) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || \
-    BUILDFLAG(IS_MAC)
+    BUILDFLAG(IS_MAC) || BUILDFLAG(IS_BSD)
   return net::URLRequestContextBuilder::HttpCacheParams::DISK_SIMPLE;
 #else
   return net::URLRequestContextBuilder::HttpCacheParams::DISK_BLOCKFILE;
