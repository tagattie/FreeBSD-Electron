--- remoting/host/host_details.cc.orig	2020-05-26 07:48:33 UTC
+++ remoting/host/host_details.cc
@@ -22,7 +22,7 @@ std::string GetHostOperatingSystemName() {
   return "Mac";
 #elif defined(OS_CHROMEOS)
   return "ChromeOS";
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   return "Linux";
 #elif defined(OS_ANDROID)
   return "Android";
