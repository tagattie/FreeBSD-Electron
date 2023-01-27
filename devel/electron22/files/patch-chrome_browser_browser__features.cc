--- chrome/browser/browser_features.cc.orig	2023-01-26 11:40:10 UTC
+++ chrome/browser/browser_features.cc
@@ -30,7 +30,7 @@ BASE_FEATURE(kColorProviderRedirectionForThemeProvider
 // the browser exits.
 BASE_FEATURE(kDestroyProfileOnBrowserClose,
              "DestroyProfileOnBrowserClose",
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_MAC) || BUILDFLAG(IS_WIN) || BUILDFLAG(IS_BSD)
              base::FEATURE_ENABLED_BY_DEFAULT);
 #else
              base::FEATURE_DISABLED_BY_DEFAULT);
