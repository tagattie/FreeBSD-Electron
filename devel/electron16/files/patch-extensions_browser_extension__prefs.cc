--- extensions/browser/extension_prefs.cc.orig	2021-11-19 04:25:17 UTC
+++ extensions/browser/extension_prefs.cc
@@ -2262,7 +2262,7 @@ void ExtensionPrefs::RegisterProfilePrefs(
   registry->RegisterStringPref(pref_names::kLastChromeVersion, std::string());
   registry->RegisterDictionaryPref(kInstallSignature);
   registry->RegisterListPref(kExternalUninstalls);
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
   registry->RegisterBooleanPref(pref_names::kChromeAppsEnabled, false);
 #endif
   registry->RegisterBooleanPref(pref_names::kU2fSecurityKeyApiEnabled, false);
