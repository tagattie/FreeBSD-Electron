--- content/gpu/gpu_main.cc.orig	2021-11-21 11:49:08 UTC
+++ content/gpu/gpu_main.cc
@@ -86,7 +86,7 @@
 #include "ui/gfx/x/x11_switches.h"                       // nogncheck
 #endif
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "content/gpu/gpu_sandbox_hook_linux.h"
 #include "content/public/common/sandbox_init.h"
 #include "sandbox/policy/linux/sandbox_linux.h"
@@ -286,7 +286,7 @@ int GpuMain(const MainFunctionParams& parameters) {
               gpu_preferences.message_pump_type);
     }
 #endif
-#elif defined(OS_LINUX) || defined(OS_CHROMEOS)
+#elif defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #error "Unsupported Linux platform."
 #elif defined(OS_MAC)
     // Cross-process CoreAnimation requires a CFRunLoop to function at all, and
