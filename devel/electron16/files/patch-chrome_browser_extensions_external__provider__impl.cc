--- chrome/browser/extensions/external_provider_impl.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/extensions/external_provider_impl.cc
@@ -813,7 +813,7 @@ void ExternalProviderImpl::CreateExternalProviders(
   if (!profile->GetPrefs()->GetBoolean(pref_names::kBlockExternalExtensions)) {
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
     provider_list->push_back(std::make_unique<ExternalProviderImpl>(
         service,
         base::MakeRefCounted<ExternalPrefLoader>(
@@ -841,7 +841,7 @@ void ExternalProviderImpl::CreateExternalProviders(
         bundled_extension_creation_flags));
 
     // Define a per-user source of external extensions.
-#if defined(OS_MAC) || ((defined(OS_LINUX) || defined(OS_CHROMEOS)) && \
+#if defined(OS_MAC) || defined(OS_BSD) || ((defined(OS_LINUX) || defined(OS_CHROMEOS)) && \
                         BUILDFLAG(CHROMIUM_BRANDING))
     provider_list->push_back(std::make_unique<ExternalProviderImpl>(
         service,
