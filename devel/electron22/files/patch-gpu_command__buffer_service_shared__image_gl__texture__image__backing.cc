--- gpu/command_buffer/service/shared_image/gl_texture_image_backing.cc.orig	2023-01-26 11:40:18 UTC
+++ gpu/command_buffer/service/shared_image/gl_texture_image_backing.cc
@@ -345,7 +345,7 @@ void GLTextureImageBacking::InitializeGLTexture(
 }
 
 void GLTextureImageBacking::CreateEGLImage() {
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || defined(USE_OZONE)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || defined(USE_OZONE) || BUILDFLAG(IS_BSD)
   SharedContextState* shared_context_state = factory()->GetSharedContextState();
   ui::ScopedMakeCurrent smc(shared_context_state->context(),
                             shared_context_state->surface());
