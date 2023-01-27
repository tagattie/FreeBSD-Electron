--- content/browser/browser_child_process_host_impl.cc.orig	2023-01-26 11:40:15 UTC
+++ content/browser/browser_child_process_host_impl.cc
@@ -316,6 +316,7 @@ void BrowserChildProcessHostImpl::LaunchWithoutExtraCo
       switches::kDisableBestEffortTasks,
       switches::kDisableLogging,
       switches::kEnableLogging,
+      switches::kDisableUnveil,
       switches::kIPCConnectionTimeout,
       switches::kLogBestEffortTasks,
       switches::kLogFile,
