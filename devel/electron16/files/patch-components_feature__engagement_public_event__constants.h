--- components/feature_engagement/public/event_constants.h.orig	2021-11-19 04:25:13 UTC
+++ components/feature_engagement/public/event_constants.h
@@ -12,7 +12,7 @@ namespace feature_engagement {
 namespace events {
 
 // Desktop
-#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 // The user has explicitly opened a new tab via an entry point from inside of
 // Chrome.
@@ -68,7 +68,7 @@ extern const char kDesktopPwaInstalled[];
 // Omnibox displayed the updated connection security indicator.
 extern const char kUpdatedConnectionSecurityIndicatorDisplayed[];
 
-#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_APPLE) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
 #if defined(OS_IOS)
