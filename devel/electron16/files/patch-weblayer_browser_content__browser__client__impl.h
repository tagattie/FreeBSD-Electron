--- weblayer/browser/content_browser_client_impl.h.orig	2021-11-19 04:25:48 UTC
+++ weblayer/browser/content_browser_client_impl.h
@@ -181,12 +181,12 @@ class ContentBrowserClientImpl : public content::Conte
       override;
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_ANDROID) || defined(OS_BSD)
   void GetAdditionalMappedFilesForChildProcess(
       const base::CommandLine& command_line,
       int child_process_id,
       content::PosixFileDescriptorInfo* mappings) override;
-#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) ||
+#endif  // defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD) ||
         // defined(OS_ANDROID)
   void AppendExtraCommandLineSwitches(base::CommandLine* command_line,
                                       int child_process_id) override;
