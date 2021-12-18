--- electron/shell/common/electron_command_line.h.orig	2021-11-15 23:45:07 UTC
+++ electron/shell/common/electron_command_line.h
@@ -18,7 +18,7 @@ class ElectronCommandLine {
 
   static void Init(int argc, base::CommandLine::CharType** argv);
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // On Linux the command line has to be read from base::CommandLine since
   // it is using zygote.
   static void InitializeFromCommandLine();
