--- chrome/browser/prefs/browser_prefs.cc.orig	2021-12-14 11:44:58 UTC
+++ chrome/browser/prefs/browser_prefs.cc
@@ -411,14 +411,14 @@
 #endif
 
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 #include "chrome/browser/web_applications/url_handler_prefs.h"
 #endif
 
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 #include "chrome/browser/browser_switcher/browser_switcher_prefs.h"
 #endif
 
@@ -485,7 +485,7 @@ const char kLocalDiscoveryNotificationsEnabled[] =
 #endif
 
 // Deprecated 11/2020
-#if defined(OS_LINUX) && !BUILDFLAG(IS_CHROMECAST)
+#if (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMECAST)) || defined(OS_BSD)
 const char kMigrationToLoginDBStep[] = "profile.migration_to_logindb_step";
 #endif
 
@@ -738,7 +738,7 @@ void RegisterProfilePrefsForMigration(
 
   registry->RegisterBooleanPref(prefs::kWebAppsUserDisplayModeCleanedUp, false);
 
-#if defined(OS_LINUX) && !BUILDFLAG(IS_CHROMECAST)
+#if (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMECAST)) || defined(OS_BSD)
   registry->RegisterIntegerPref(kMigrationToLoginDBStep, 0);
 #endif
 
@@ -1057,10 +1057,10 @@ void RegisterLocalState(PrefRegistrySimple* registry) 
 
 // TODO(crbug/1169547) Remove `BUILDFLAG(IS_CHROMEOS_LACROS)` once the
 // migration is complete.
-#if defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) || \
+#if defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) || defined(OS_BSD) || \
     BUILDFLAG(IS_CHROMEOS_LACROS)
   enterprise_connectors::RegisterLocalPrefs(registry);
-#endif  // defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN)
+#endif  // defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) || defined(OS_BSD)
 
 #if defined(OS_MAC)
   confirm_quit::RegisterLocalState(registry);
@@ -1090,7 +1090,7 @@ void RegisterLocalState(PrefRegistrySimple* registry) 
 #endif  // defined(OS_WIN)
 
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   web_app::url_handler_prefs::RegisterLocalStatePrefs(registry);
 #endif
 
@@ -1386,7 +1386,7 @@ void RegisterProfilePrefs(user_prefs::PrefRegistrySync
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
 #if defined(OS_WIN) || defined(OS_MAC) || \
-    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
   browser_switcher::BrowserSwitcherPrefs::RegisterProfilePrefs(registry);
 #endif
 
@@ -1526,7 +1526,7 @@ void MigrateObsoleteProfilePrefs(Profile* profile) {
       profile_prefs);
 
   // Added 11/2020
-#if defined(OS_LINUX) && !BUILDFLAG(IS_CHROMECAST)
+#if (defined(OS_LINUX) && !BUILDFLAG(IS_CHROMECAST)) || defined(OS_BSD)
   profile_prefs->ClearPref(kMigrationToLoginDBStep);
 #endif
 
