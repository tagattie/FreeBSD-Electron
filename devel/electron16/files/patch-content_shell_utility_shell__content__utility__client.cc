--- content/shell/utility/shell_content_utility_client.cc.orig	2021-09-14 01:51:57 UTC
+++ content/shell/utility/shell_content_utility_client.cc
@@ -33,7 +33,7 @@
 #include "sandbox/policy/sandbox.h"
 #include "services/test/echo/echo_service.h"
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "content/test/sandbox_status_service.h"
 #endif
 
@@ -142,7 +142,7 @@ void ShellContentUtilityClient::ExposeInterfacesToBrow
   binders->Add<mojom::PowerMonitorTest>(
       base::BindRepeating(&PowerMonitorTestImpl::MakeSelfOwnedReceiver),
       base::ThreadTaskRunnerHandle::Get());
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   if (register_sandbox_status_helper_) {
     binders->Add<content::mojom::SandboxStatusService>(
         base::BindRepeating(
