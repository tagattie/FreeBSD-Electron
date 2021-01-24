--- chrome/browser/policy/chrome_browser_cloud_management_controller.cc.orig	2020-09-21 18:39:08 UTC
+++ chrome/browser/policy/chrome_browser_cloud_management_controller.cc
@@ -228,7 +228,7 @@ ChromeBrowserCloudManagementController::ChromeBrowserC
   storage_delegate = std::make_unique<BrowserDMTokenStorageWin>();
 #elif defined(OS_MACOSX)
   storage_delegate = std::make_unique<BrowserDMTokenStorageMac>();
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   storage_delegate = std::make_unique<BrowserDMTokenStorageLinux>();
 #else
   NOT_REACHED();
