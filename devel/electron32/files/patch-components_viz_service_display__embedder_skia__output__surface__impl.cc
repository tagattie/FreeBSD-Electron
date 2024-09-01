--- components/viz/service/display_embedder/skia_output_surface_impl.cc.orig	2024-08-14 20:54:58 UTC
+++ components/viz/service/display_embedder/skia_output_surface_impl.cc
@@ -1663,7 +1663,7 @@ GrBackendFormat SkiaOutputSurfaceImpl::GetGrBackendFor
                                             ->GetVulkanPhysicalDevice(),
                                         VK_IMAGE_TILING_OPTIMAL, vk_format,
                                         si_format, yuv_color_space, ycbcr_info);
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
     // Textures that were allocated _on linux_ with ycbcr info came from
     // VaapiVideoDecoder, which exports using DRM format modifiers.
     return GrBackendFormats::MakeVk(gr_ycbcr_info,
