--- content/public/common/content_features.h.orig	2023-02-01 18:43:19 UTC
+++ content/public/common/content_features.h
@@ -107,7 +107,7 @@ CONTENT_EXPORT BASE_DECLARE_FEATURE(kFractionalScrollO
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kGetDisplayMediaSet);
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kGetDisplayMediaSetAutoSelectAllScreens);
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kGreaseUACH);
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kHandleRendererThreadTypeChangesInBrowser);
 #endif
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kIdleDetection);
@@ -282,7 +282,7 @@ CONTENT_EXPORT BASE_DECLARE_FEATURE(kVideoPlaybackQual
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kV8VmFuture);
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kWebAssemblyBaseline);
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kWebAssemblyCodeProtection);
-#if (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)) && defined(ARCH_CPU_X86_64)
+#if (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)) && defined(ARCH_CPU_X86_64)
 CONTENT_EXPORT BASE_DECLARE_FEATURE(kWebAssemblyCodeProtectionPku);
 #endif  // (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)) &&
         // defined(ARCH_CPU_X86_64)
