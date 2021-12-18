--- chromecast/external_mojo/public/cpp/external_mojo_broker.cc.orig	2021-11-19 04:25:12 UTC
+++ chromecast/external_mojo/public/cpp/external_mojo_broker.cc
@@ -8,7 +8,7 @@
 #include <set>
 #include <utility>
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include <sys/stat.h>
 #endif
 
@@ -427,7 +427,7 @@ ExternalMojoBroker::ExternalMojoBroker(const std::stri
       named_channel.TakeServerEndpoint();
   DCHECK(server_endpoint.is_valid());
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   chmod(broker_path.c_str(), 0770);
 #endif
 
