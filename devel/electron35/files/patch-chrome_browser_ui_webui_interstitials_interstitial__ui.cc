--- chrome/browser/ui/webui/interstitials/interstitial_ui.cc.orig	2025-03-24 20:50:14 UTC
+++ chrome/browser/ui/webui/interstitials/interstitial_ui.cc
@@ -74,7 +74,7 @@
 #include "components/security_interstitials/content/captive_portal_blocking_page.h"
 #endif
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN) || BUILDFLAG(IS_BSD)
 #include "chrome/browser/supervised_user/supervised_user_verification_controller_client.h"
 #include "chrome/browser/supervised_user/supervised_user_verification_page_blocked_sites.h"
 #include "chrome/browser/supervised_user/supervised_user_verification_page_youtube.h"
@@ -407,7 +407,7 @@ std::unique_ptr<EnterpriseWarnPage> CreateEnterpriseWa
 }
 #endif
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN) || BUILDFLAG(IS_BSD)
 std::unique_ptr<SupervisedUserVerificationPageForYouTube>
 CreateSupervisedUserVerificationPageForYouTube(
     content::WebContents* web_contents,
@@ -634,7 +634,7 @@ void InterstitialHTMLSource::StartDataRequest(
     interstitial_delegate = CreateInsecureFormPage(web_contents);
   } else if (path_without_query == "/https_only") {
     interstitial_delegate = CreateHttpsOnlyModePage(web_contents);
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN) || BUILDFLAG(IS_BSD)
   } else if (path_without_query == "/supervised-user-verify") {
     interstitial_delegate = CreateSupervisedUserVerificationPageForYouTube(
         web_contents, /*is_main_frame=*/true);
