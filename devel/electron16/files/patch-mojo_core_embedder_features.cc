--- mojo/core/embedder/features.cc.orig	2021-11-19 04:25:19 UTC
+++ mojo/core/embedder/features.cc
@@ -8,7 +8,7 @@ namespace mojo {
 namespace core {
 
 #if defined(OS_POSIX) && !defined(OS_NACL) && !defined(OS_MAC)
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID) || defined(OS_BSD)
 const base::Feature kMojoLinuxChannelSharedMem{
     "MojoLinuxChannelSharedMem", base::FEATURE_DISABLED_BY_DEFAULT};
 const base::FeatureParam<int> kMojoLinuxChannelSharedMemPages{
@@ -16,7 +16,7 @@ const base::FeatureParam<int> kMojoLinuxChannelSharedM
 const base::FeatureParam<bool> kMojoLinuxChannelSharedMemEfdZeroOnWake{
     &kMojoLinuxChannelSharedMem, "MojoLinuxChannelSharedMemEfdZeroOnWake",
     false};
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_ANDROID) || defined(OS_BSD)
 
 const base::Feature kMojoPosixUseWritev{"MojoPosixUseWritev",
                                         base::FEATURE_DISABLED_BY_DEFAULT};
