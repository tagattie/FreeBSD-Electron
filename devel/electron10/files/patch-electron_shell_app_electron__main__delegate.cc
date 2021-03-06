--- electron/shell/app/electron_main_delegate.cc.orig	2021-01-14 16:50:03 UTC
+++ electron/shell/app/electron_main_delegate.cc
@@ -248,7 +248,7 @@ bool ElectronMainDelegate::BasicStartupComplete(int* e
     base::win::PinUser32();
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Check for --no-sandbox parameter when running as root.
   if (getuid() == 0 && IsSandboxEnabled(command_line))
     LOG(FATAL) << "Running as root without --"
