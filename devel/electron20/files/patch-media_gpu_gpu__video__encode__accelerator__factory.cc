--- media/gpu/gpu_video_encode_accelerator_factory.cc.orig	2022-08-01 19:04:31 UTC
+++ media/gpu/gpu_video_encode_accelerator_factory.cc
@@ -103,7 +103,7 @@ std::vector<VEAFactoryFunction> GetVEAFactoryFunctions
     return vea_factory_functions;
 
 #if BUILDFLAG(USE_VAAPI)
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   if (base::FeatureList::IsEnabled(kVaapiVideoEncodeLinux))
     vea_factory_functions.push_back(base::BindRepeating(&CreateVaapiVEA));
 #else
