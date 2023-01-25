--- electron/shell/app/electron_main_delegate.cc.orig	2023-01-17 21:24:40 UTC
+++ electron/shell/app/electron_main_delegate.cc
@@ -54,14 +54,17 @@
 #include "chrome/child/v8_crashpad_support_win.h"
 #endif
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 #include "base/nix/xdg_util.h"
+#endif
+
+#if BUILDFLAG(IS_LINUX)
 #include "components/crash/core/app/breakpad_linux.h"
 #include "v8/include/v8-wasm-trap-handler-posix.h"
 #include "v8/include/v8.h"
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !BUILDFLAG(IS_BSD)
 #include "components/crash/core/app/crash_switches.h"  // nogncheck
 #include "components/crash/core/app/crashpad.h"        // nogncheck
 #include "components/crash/core/common/crash_key.h"
@@ -158,7 +161,7 @@ bool ElectronPathProvider(int key, base::FilePath* res
       create_dir = true;
       break;
     }
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
     case DIR_APP_DATA: {
       auto env = base::Environment::Create();
       cur = base::nix::GetXDGDirectory(
@@ -292,7 +295,7 @@ bool ElectronMainDelegate::BasicStartupComplete(int* e
     base::win::PinUser32();
 #endif
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   // Check for --no-sandbox parameter when running as root.
   if (getuid() == 0 && IsSandboxEnabled(command_line))
     LOG(FATAL) << "Running as root without --"
@@ -347,7 +350,7 @@ void ElectronMainDelegate::PreSandboxStartup() {
                                    process_type == ::switches::kZygoteProcess);
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !BUILDFLAG(IS_BSD)
   crash_reporter::InitializeCrashKeys();
 #endif
 
@@ -386,7 +389,7 @@ void ElectronMainDelegate::PreSandboxStartup() {
   }
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !BUILDFLAG(IS_BSD)
   crash_keys::SetCrashKeysFromCommandLine(*command_line);
   crash_keys::SetPlatformCrashKey();
 #endif
