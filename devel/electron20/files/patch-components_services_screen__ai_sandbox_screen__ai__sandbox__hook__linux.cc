--- components/services/screen_ai/sandbox/screen_ai_sandbox_hook_linux.cc.orig	2022-08-01 19:04:27 UTC
+++ components/services/screen_ai/sandbox/screen_ai_sandbox_hook_linux.cc
@@ -36,6 +36,7 @@ bool ScreenAIPreSandboxHook(sandbox::policy::SandboxLi
   }
   screen_ai::SetPreloadedLibraryFilePath(library_path);
 
+#if !BUILDFLAG(IS_BSD)
   auto* instance = sandbox::policy::SandboxLinux::GetInstance();
 
   std::vector<BrokerFilePermission> permissions{
@@ -59,6 +60,7 @@ bool ScreenAIPreSandboxHook(sandbox::policy::SandboxLi
                             sandbox::syscall_broker::COMMAND_OPEN}),
       permissions, sandbox::policy::SandboxLinux::PreSandboxHook(), options);
   instance->EngageNamespaceSandboxIfPossible();
+#endif
 
   return true;
 }
