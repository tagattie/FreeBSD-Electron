--- chrome/app/chrome_main_delegate.cc.orig	2021-11-19 04:25:05 UTC
+++ chrome/app/chrome_main_delegate.cc
@@ -153,15 +153,17 @@
 #include "v8/include/v8.h"
 #endif
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "base/environment.h"
 #endif
 
 #if defined(OS_MAC) || defined(OS_WIN) || defined(OS_ANDROID) || \
-    defined(OS_LINUX) || defined(OS_CHROMEOS)
+    defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "chrome/browser/policy/policy_path_parser.h"
+#if !defined(OS_BSD)
 #include "components/crash/core/app/crashpad.h"
 #endif
+#endif
 
 #if BUILDFLAG(ENABLE_NACL)
 #include "components/nacl/common/nacl_switches.h"
@@ -265,7 +267,7 @@ void SetUpExtendedCrashReporting(bool is_browser_proce
 
 #endif  // defined(OS_WIN)
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) || defined(OS_CHROMEOS))
 void AdjustLinuxOOMScore(const std::string& process_type) {
   int score = -1;
 
@@ -300,7 +302,7 @@ void AdjustLinuxOOMScore(const std::string& process_ty
   if (score > -1)
     base::AdjustOOMScore(base::GetCurrentProcId(), score);
 }
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // (defined(OS_LINUX) || defined(OS_CHROMEOS))
 
 // Returns true if this subprocess type needs the ResourceBundle initialized
 // and resources loaded.
@@ -346,7 +348,7 @@ bool HandleVersionSwitches(const base::CommandLine& co
 
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
 // Show the man page if --help or -h is on the command line.
 void HandleHelpSwitches(const base::CommandLine& command_line) {
   if (command_line.HasSwitch(switches::kHelp) ||
@@ -356,7 +358,7 @@ void HandleHelpSwitches(const base::CommandLine& comma
     PLOG(FATAL) << "execlp failed";
   }
 }
-#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
 
 #if !defined(OS_MAC) && !defined(OS_ANDROID)
 void SIGTERMProfilingShutdown(int signal) {
@@ -410,7 +412,7 @@ void InitializeUserDataDir(base::CommandLine* command_
   std::string process_type =
       command_line->GetSwitchValueASCII(switches::kProcessType);
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // On Linux, Chrome does not support running multiple copies under different
   // DISPLAYs, so the profile directory can be specified in the environment to
   // support the virtual desktop use-case.
@@ -422,7 +424,7 @@ void InitializeUserDataDir(base::CommandLine* command_
       user_data_dir = base::FilePath::FromUTF8Unsafe(user_data_dir_string);
     }
   }
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #if defined(OS_MAC)
   policy::path_parser::CheckUserDataDirPolicy(&user_data_dir);
 #endif  // OS_MAC
@@ -493,7 +495,7 @@ void RecordMainStartupMetrics(base::TimeTicks applicat
   startup_metric_utils::RecordApplicationStartTime(now);
 #endif
 
-#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || \
+#if defined(OS_MAC) || defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   // Record the startup process creation time on supported platforms. On Android
   // this is recorded in ChromeMainDelegateAndroid.
@@ -677,6 +679,8 @@ void ChromeMainDelegate::PostFieldTrialInitialization(
   // not always enabled on Linux/ChromeOS.
 #if defined(OS_LINUX) || defined(OS_CHROMEOS)
   bool enable_gwp_asan = crash_reporter::IsCrashpadEnabled();
+#elif defined(OS_BSD)
+  bool enable_gwp_asan = false;
 #else
   bool enable_gwp_asan = true;
 #endif
@@ -785,7 +789,7 @@ bool ChromeMainDelegate::BasicStartupComplete(int* exi
   v8_crashpad_support::SetUp();
 #endif
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) || defined(OS_CHROMEOS))
   if (!crash_reporter::IsCrashpadEnabled()) {
     breakpad::SetFirstChanceExceptionHandler(v8::TryHandleWebAssemblyTrapPosix);
   }
@@ -798,7 +802,7 @@ bool ChromeMainDelegate::BasicStartupComplete(int* exi
   }
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
   // This will directly exit if the user asked for help.
   HandleHelpSwitches(command_line);
 #endif
@@ -1009,7 +1013,7 @@ void ChromeMainDelegate::PreSandboxStartup() {
 
   crash_reporter::InitializeCrashKeys();
 
-#if defined(OS_POSIX)
+#if defined(OS_POSIX) && !defined(OS_BSD)
   ChromeCrashReporterClient::Create();
 #endif
 
@@ -1022,7 +1026,7 @@ void ChromeMainDelegate::PreSandboxStartup() {
   child_process_logging::Init();
 #endif
 #if defined(ARCH_CPU_ARM_FAMILY) && \
-    (defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_CHROMEOS))
+    (defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD))
   // Create an instance of the CPU class to parse /proc/cpuinfo and cache
   // cpu_brand info.
   base::CPU cpu_info;
@@ -1140,7 +1144,7 @@ void ChromeMainDelegate::PreSandboxStartup() {
         locale;
   }
 
-#if defined(OS_POSIX) && !defined(OS_MAC)
+#if defined(OS_POSIX) && !defined(OS_MAC) && !defined(OS_BSD)
   // Zygote needs to call InitCrashReporter() in RunZygote().
   if (process_type != switches::kZygoteProcess) {
 #if defined(OS_ANDROID)
@@ -1161,7 +1165,7 @@ void ChromeMainDelegate::PreSandboxStartup() {
     }
 #endif  // defined(OS_ANDROID)
   }
-#endif  // defined(OS_POSIX) && !defined(OS_MAC)
+#endif  // defined(OS_POSIX) && !defined(OS_MAC) && !defined(OS_BSD)
 
 #if defined(OS_ANDROID)
   CHECK_EQ(base::android::GetLibraryProcessType(),
@@ -1181,7 +1185,7 @@ void ChromeMainDelegate::PreSandboxStartup() {
 void ChromeMainDelegate::SandboxInitialized(const std::string& process_type) {
   // Note: If you are adding a new process type below, be sure to adjust the
   // AdjustLinuxOOMScore function too.
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) || defined(OS_CHROMEOS))
   AdjustLinuxOOMScore(process_type);
 #endif
 #if defined(OS_WIN)
@@ -1223,7 +1227,7 @@ int ChromeMainDelegate::RunProcess(
 
     // This entry is not needed on Linux, where the NaCl loader
     // process is launched via nacl_helper instead.
-#if BUILDFLAG(ENABLE_NACL) && !defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if BUILDFLAG(ENABLE_NACL) && !defined(OS_LINUX) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
     {switches::kNaClLoaderProcess, NaClMain},
 #else
     {"<invalid>", nullptr},  // To avoid constant array of size 0
@@ -1251,7 +1255,7 @@ void ChromeMainDelegate::ProcessExiting(const std::str
 #endif  // !defined(OS_ANDROID)
 }
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) || defined(OS_CHROMEOS))
 void ChromeMainDelegate::ZygoteStarting(
     std::vector<std::unique_ptr<content::ZygoteForkDelegate>>* delegates) {
 #if BUILDFLAG(IS_CHROMEOS_ASH)
@@ -1288,7 +1292,7 @@ void ChromeMainDelegate::ZygoteForked() {
   crash_keys::SetCrashKeysFromCommandLine(*command_line);
 }
 
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // (defined(OS_LINUX) || defined(OS_CHROMEOS))
 
 content::ContentClient* ChromeMainDelegate::CreateContentClient() {
   return &chrome_content_client_;
