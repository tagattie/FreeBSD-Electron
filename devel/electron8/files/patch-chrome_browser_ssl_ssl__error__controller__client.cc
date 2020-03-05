--- chrome/browser/ssl/ssl_error_controller_client.cc.orig	2020-03-03 07:02:34 UTC
+++ chrome/browser/ssl/ssl_error_controller_client.cc
@@ -79,7 +79,7 @@ void LaunchDateAndTimeSettingsImpl() {
 #if defined(OS_ANDROID)
   chrome::android::OpenDateAndTimeSettings();
 
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   struct ClockCommand {
     const char* const pathname;
     const char* const argument;
@@ -204,7 +204,7 @@ void SSLErrorControllerClient::Proceed() {
 }
 
 bool SSLErrorControllerClient::CanLaunchDateAndTimeSettings() {
-#if defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_MACOSX) || \
+#if defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_MACOSX) || defined(OS_BSD) || \
     defined(OS_WIN)
   return true;
 #else
