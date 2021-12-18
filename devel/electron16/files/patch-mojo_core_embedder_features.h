--- mojo/core/embedder/features.h.orig	2021-11-19 04:25:19 UTC
+++ mojo/core/embedder/features.h
@@ -14,7 +14,7 @@ namespace mojo {
 namespace core {
 
 #if defined(OS_POSIX) && !defined(OS_NACL) && !defined(OS_MAC)
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID) || defined(OS_BSD)
 COMPONENT_EXPORT(MOJO_CORE_EMBEDDER_FEATURES)
 extern const base::Feature kMojoLinuxChannelSharedMem;
 
@@ -23,7 +23,7 @@ extern const base::FeatureParam<int> kMojoLinuxChannel
 
 COMPONENT_EXPORT(MOJO_CORE_EMBEDDER_FEATURES)
 extern const base::FeatureParam<bool> kMojoLinuxChannelSharedMemEfdZeroOnWake;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID) || defined(OS_BSD)
 
 COMPONENT_EXPORT(MOJO_CORE_EMBEDDER_FEATURES)
 extern const base::Feature kMojoPosixUseWritev;
