--- content/public/common/content_features.h.orig	2021-11-19 04:25:16 UTC
+++ content/public/common/content_features.h
@@ -234,9 +234,9 @@ CONTENT_EXPORT extern const base::Feature
 CONTENT_EXPORT extern const base::Feature kWebAppWindowControlsOverlay;
 CONTENT_EXPORT extern const base::Feature kWebAssemblyBaseline;
 CONTENT_EXPORT extern const base::Feature kWebAssemblyCodeProtection;
-#if (defined(OS_LINUX) || defined(OS_CHROMEOS)) && defined(ARCH_CPU_X86_64)
+#if (defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)) && defined(ARCH_CPU_X86_64)
 CONTENT_EXPORT extern const base::Feature kWebAssemblyCodeProtectionPku;
-#endif  // (defined(OS_LINUX) || defined(OS_CHROMEOS)) &&
+#endif  // (defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)) &&
         // defined(ARCH_CPU_X86_64)
 CONTENT_EXPORT extern const base::Feature kWebAssemblyLazyCompilation;
 CONTENT_EXPORT extern const base::Feature kWebAssemblySimd;
@@ -281,13 +281,13 @@ CONTENT_EXPORT extern const base::Feature kMacSyscallS
 CONTENT_EXPORT extern const base::Feature kRetryGetVideoCaptureDeviceInfos;
 #endif  // defined(OS_MAC)
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 CONTENT_EXPORT extern const base::Feature kSendWebUIJavaScriptErrorReports;
 CONTENT_EXPORT extern const char
     kSendWebUIJavaScriptErrorReportsSendToProductionVariation[];
 CONTENT_EXPORT extern const base::FeatureParam<bool>
     kWebUIJavaScriptErrorReportsSendToProductionParam;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
 CONTENT_EXPORT extern const base::Feature kAuraWindowSubtreeCapture;
