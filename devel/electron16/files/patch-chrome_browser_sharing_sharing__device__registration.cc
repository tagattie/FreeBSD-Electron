--- chrome/browser/sharing/sharing_device_registration.cc.orig	2021-11-19 04:25:09 UTC
+++ chrome/browser/sharing/sharing_device_registration.cc
@@ -326,7 +326,7 @@ bool SharingDeviceRegistration::IsSmsFetcherSupported(
 }
 
 bool SharingDeviceRegistration::IsRemoteCopySupported() const {
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   return true;
 #else
