--- content/browser/gpu/gpu_process_host.cc.orig	2021-01-23 01:42:15 UTC
+++ content/browser/gpu/gpu_process_host.cc
@@ -221,7 +221,7 @@ static const char* const kSwitchNames[] = {
     service_manager::switches::kGpuSandboxFailuresFatal,
     service_manager::switches::kDisableGpuSandbox,
     service_manager::switches::kNoSandbox,
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
     switches::kDisableDevShmUsage,
 #endif
 #if defined(OS_WIN)
@@ -1118,7 +1118,7 @@ bool GpuProcessHost::LaunchGpuProcess() {
   std::unique_ptr<base::CommandLine> cmd_line =
       std::make_unique<base::CommandLine>(base::CommandLine::NO_PROGRAM);
 #else
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   int child_flags = gpu_launcher.empty() ? ChildProcessHost::CHILD_ALLOW_SELF
                                          : ChildProcessHost::CHILD_NORMAL;
 #elif defined(OS_MACOSX)
