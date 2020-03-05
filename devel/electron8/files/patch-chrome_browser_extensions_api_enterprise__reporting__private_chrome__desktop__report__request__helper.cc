--- chrome/browser/extensions/api/enterprise_reporting_private/chrome_desktop_report_request_helper.cc.orig	2020-03-03 07:02:28 UTC
+++ chrome/browser/extensions/api/enterprise_reporting_private/chrome_desktop_report_request_helper.cc
@@ -369,7 +369,7 @@ base::FilePath GetEndpointVerificationDir() {
   base::FilePath path;
 #if defined(OS_WIN)
   if (!base::PathService::Get(base::DIR_LOCAL_APP_DATA, &path))
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   if (!base::PathService::Get(base::DIR_CACHE, &path))
 #elif defined(OS_MACOSX)
   if (!base::PathService::Get(base::DIR_APP_DATA, &path))
