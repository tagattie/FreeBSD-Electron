--- electron/shell/app/electron_main_delegate.cc.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/app/electron_main_delegate.cc
@@ -291,7 +291,7 @@ bool ElectronMainDelegate::BasicStartupComplete(int* e
     base::win::PinUser32();
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Check for --no-sandbox parameter when running as root.
   if (getuid() == 0 && IsSandboxEnabled(command_line))
     LOG(FATAL) << "Running as root without --"
@@ -375,7 +375,7 @@ void ElectronMainDelegate::PreSandboxStartup() {
   }
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   crash_keys::SetCrashKeysFromCommandLine(*command_line);
   crash_keys::SetPlatformCrashKey();
 #endif
