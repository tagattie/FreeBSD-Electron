--- base/base_switches.h.orig	2023-01-26 11:40:09 UTC
+++ base/base_switches.h
@@ -60,7 +60,7 @@ extern const char kEnableIdleTracing[];
 extern const char kForceFieldTrialParams[];
 #endif
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
 // TODO(crbug.com/1176772): Remove kEnableCrashpad and IsCrashpadEnabled() when
 // Crashpad is fully enabled on Linux.
 extern const char kEnableCrashpad[];
