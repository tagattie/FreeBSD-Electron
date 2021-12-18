--- headless/lib/browser/headless_content_browser_client.cc.orig	2021-11-19 04:25:17 UTC
+++ headless/lib/browser/headless_content_browser_client.cc
@@ -228,7 +228,7 @@ HeadlessContentBrowserClient::GetGeneratedCodeCacheSet
   return content::GeneratedCodeCacheSettings(true, 0, context->GetPath());
 }
 
-#if defined(OS_POSIX) && !defined(OS_MAC)
+#if defined(OS_POSIX) && !defined(OS_MAC) && !defined(OS_BSD)
 void HeadlessContentBrowserClient::GetAdditionalMappedFilesForChildProcess(
     const base::CommandLine& command_line,
     int child_process_id,
@@ -239,7 +239,7 @@ void HeadlessContentBrowserClient::GetAdditionalMapped
     mappings->Share(kCrashDumpSignal, crash_signal_fd);
 #endif  // defined(HEADLESS_USE_BREAKPAD)
 }
-#endif  // defined(OS_POSIX) && !defined(OS_MAC)
+#endif  // defined(OS_POSIX) && !defined(OS_MAC) && !defined(OS_BSD)
 
 void HeadlessContentBrowserClient::AppendExtraCommandLineSwitches(
     base::CommandLine* command_line,
@@ -311,7 +311,7 @@ void HeadlessContentBrowserClient::AppendExtraCommandL
                                             process_type, child_process_id);
   }
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // Processes may only query perf_event_open with the BPF sandbox disabled.
   if (old_command_line.HasSwitch(::switches::kEnableThreadInstructionCount) &&
       old_command_line.HasSwitch(sandbox::policy::switches::kNoSandbox)) {
