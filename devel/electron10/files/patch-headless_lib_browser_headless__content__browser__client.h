--- headless/lib/browser/headless_content_browser_client.h.orig	2020-09-21 18:39:18 UTC
+++ headless/lib/browser/headless_content_browser_client.h
@@ -29,7 +29,7 @@ class HeadlessContentBrowserClient : public content::C
       override;
   content::GeneratedCodeCacheSettings GetGeneratedCodeCacheSettings(
       content::BrowserContext* context) override;
-#if defined(OS_POSIX) && !defined(OS_MACOSX)
+#if defined(OS_POSIX) && !defined(OS_MACOSX) && !defined(OS_BSD)
   void GetAdditionalMappedFilesForChildProcess(
       const base::CommandLine& command_line,
       int child_process_id,
