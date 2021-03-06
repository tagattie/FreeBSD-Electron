--- base/i18n/icu_util.cc.orig	2020-03-03 07:02:14 UTC
+++ base/i18n/icu_util.cc
@@ -43,7 +43,7 @@
 #endif
 
 #if defined(OS_ANDROID) || defined(OS_FUCHSIA) || \
-    (defined(OS_LINUX) && !defined(IS_CHROMECAST))
+    (defined(OS_LINUX) && !defined(IS_CHROMECAST)) || defined(OS_BSD)
 #include "third_party/icu/source/i18n/unicode/timezone.h"
 #endif
 
@@ -288,7 +288,7 @@ void InitializeIcuTimeZone() {
       fuchsia::IntlProfileWatcher::GetPrimaryTimeZoneIdForIcuInitialization();
   icu::TimeZone::adoptDefault(
       icu::TimeZone::createTimeZone(icu::UnicodeString::fromUTF8(zone_id)));
-#elif defined(OS_LINUX) && !defined(IS_CHROMECAST)
+#elif (defined(OS_LINUX) && !defined(IS_CHROMECAST)) || defined(OS_BSD)
   // To respond to the timezone change properly, the default timezone
   // cache in ICU has to be populated on starting up.
   // See TimeZoneMonitorLinux::NotifyClientsFromImpl().
