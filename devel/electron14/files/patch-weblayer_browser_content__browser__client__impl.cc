--- weblayer/browser/content_browser_client_impl.cc.orig	2021-09-14 01:52:23 UTC
+++ weblayer/browser/content_browser_client_impl.cc
@@ -148,7 +148,7 @@
 
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_ANDROID) || defined(OS_BSD)
 #include "content/public/common/content_descriptors.h"
 #endif
 
@@ -492,7 +492,7 @@ void ContentBrowserClientImpl::OnNetworkServiceCreated
         embedder_support::GetUserAgent());
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
   network::mojom::CryptConfigPtr config = network::mojom::CryptConfig::New();
   content::GetNetworkService()->SetCryptConfig(std::move(config));
 #endif
@@ -991,7 +991,7 @@ SafeBrowsingService* ContentBrowserClientImpl::GetSafe
 
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_ANDROID) || defined(OS_BSD)
 void ContentBrowserClientImpl::GetAdditionalMappedFilesForChildProcess(
     const base::CommandLine& command_line,
     int child_process_id,
@@ -1025,7 +1025,7 @@ void ContentBrowserClientImpl::GetAdditionalMappedFile
     mappings->Share(kCrashDumpSignal, crash_signal_fd);
 #endif  // defined(OS_ANDROID)
 }
-#endif  // defined(OS_LINUX)|| defined(OS_ANDROID)
+#endif  // defined(OS_LINUX)|| defined(OS_ANDROID) || defined(OS_BSD)
 
 void ContentBrowserClientImpl::AppendExtraCommandLineSwitches(
     base::CommandLine* command_line,
