--- chrome/browser/sharing/sharing_device_registration.cc.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/sharing/sharing_device_registration.cc
@@ -321,7 +321,7 @@ bool SharingDeviceRegistration::IsSmsFetcherSupported(
 }
 
 bool SharingDeviceRegistration::IsRemoteCopySupported() const {
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   return true;
 #else
