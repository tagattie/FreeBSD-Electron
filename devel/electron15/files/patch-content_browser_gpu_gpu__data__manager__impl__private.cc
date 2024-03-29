--- content/browser/gpu/gpu_data_manager_impl_private.cc.orig	2021-11-28 04:34:36 UTC
+++ content/browser/gpu/gpu_data_manager_impl_private.cc
@@ -1352,7 +1352,7 @@ void GpuDataManagerImplPrivate::AppendGpuCommandLine(
       break;
     case gpu::GpuMode::SWIFTSHADER: {
       bool legacy_software_gl = true;
-#if (defined(OS_LINUX) && !defined(USE_OZONE)) || defined(OS_WIN)
+#if ((defined(OS_LINUX) || defined(OS_BSD)) && !defined(USE_OZONE)) || defined(OS_WIN)
       // This setting makes WebGL run on SwANGLE instead of SwiftShader GL.
       legacy_software_gl = false;
 #endif
