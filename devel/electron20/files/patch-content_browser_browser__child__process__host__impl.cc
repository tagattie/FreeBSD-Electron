--- content/browser/browser_child_process_host_impl.cc.orig	2022-08-01 19:04:28 UTC
+++ content/browser/browser_child_process_host_impl.cc
@@ -294,6 +294,7 @@ void BrowserChildProcessHostImpl::LaunchWithoutExtraCo
       switches::kDisableBestEffortTasks,
       switches::kDisableLogging,
       switches::kEnableLogging,
+      switches::kDisableUnveil,
       switches::kIPCConnectionTimeout,
       switches::kLogBestEffortTasks,
       switches::kLogFile,
