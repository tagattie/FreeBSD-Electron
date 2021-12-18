--- content/utility/utility_main.cc.orig	2021-09-14 01:51:57 UTC
+++ content/utility/utility_main.cc
@@ -113,6 +113,11 @@ int UtilityMain(const MainFunctionParams& parameters) 
     }
   }
 
+#if defined(OS_FREEBSD)
+  sandbox::policy::Sandbox::Initialize(
+      sandbox::policy::SandboxTypeFromCommandLine(parameters.command_line));
+#endif
+
 #if defined(OS_LINUX) || defined(OS_CHROMEOS)
   // Initializes the sandbox before any threads are created.
   // TODO(jorgelo): move this after GTK initialization when we enable a strict
