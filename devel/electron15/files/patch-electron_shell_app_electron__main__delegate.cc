--- electron/shell/app/electron_main_delegate.cc.orig	2021-11-15 23:45:07 UTC
+++ electron/shell/app/electron_main_delegate.cc
@@ -50,8 +50,11 @@
 #include "chrome/child/v8_crashpad_support_win.h"
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include "base/nix/xdg_util.h"
+#endif
+
+#if defined(OS_LINUX)
 #include "components/crash/core/app/breakpad_linux.h"
 #include "v8/include/v8-wasm-trap-handler-posix.h"
 #include "v8/include/v8.h"
@@ -156,7 +159,7 @@ bool ElectronPathProvider(int key, base::FilePath* res
       create_dir = true;
       break;
     }
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
     case DIR_APP_DATA: {
       auto env = base::Environment::Create();
       cur = base::nix::GetXDGDirectory(
@@ -288,7 +291,7 @@ bool ElectronMainDelegate::BasicStartupComplete(int* e
     base::win::PinUser32();
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Check for --no-sandbox parameter when running as root.
   if (getuid() == 0 && IsSandboxEnabled(command_line))
     LOG(FATAL) << "Running as root without --"
@@ -382,7 +385,7 @@ void ElectronMainDelegate::PreSandboxStartup() {
   }
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   crash_keys::SetCrashKeysFromCommandLine(*command_line);
   crash_keys::SetPlatformCrashKey();
 #endif
