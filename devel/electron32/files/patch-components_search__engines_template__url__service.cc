--- components/search_engines/template_url_service.cc.orig	2024-08-14 20:54:56 UTC
+++ components/search_engines/template_url_service.cc
@@ -3081,7 +3081,7 @@ TemplateURLService::GetEnterpriseSiteSearchManager(Pre
 std::unique_ptr<EnterpriseSiteSearchManager>
 TemplateURLService::GetEnterpriseSiteSearchManager(PrefService* prefs) {
 #if BUILDFLAG(IS_WIN) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_LINUX) || \
-    BUILDFLAG(IS_CHROMEOS)
+    BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
   return base::FeatureList::IsEnabled(omnibox::kSiteSearchSettingsPolicy)
              ? std::make_unique<EnterpriseSiteSearchManager>(
                    prefs, base::BindRepeating(
