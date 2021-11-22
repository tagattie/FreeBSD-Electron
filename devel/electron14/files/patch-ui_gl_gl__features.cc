--- ui/gl/gl_features.cc.orig	2021-09-14 01:52:23 UTC
+++ ui/gl/gl_features.cc
@@ -72,7 +72,7 @@ bool IsDeviceBlocked(const char* field, const std::str
 const base::Feature kDefaultPassthroughCommandDecoder{
   "DefaultPassthroughCommandDecoder",
 #if defined(OS_WIN) ||                                       \
-    ((defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) && \
+    ((defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)) && \
      !defined(CHROMECAST_BUILD))
       base::FEATURE_ENABLED_BY_DEFAULT
 #else
