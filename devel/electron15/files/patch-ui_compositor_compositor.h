--- ui/compositor/compositor.h.orig	2021-11-21 11:49:08 UTC
+++ ui/compositor/compositor.h
@@ -392,7 +392,7 @@ class COMPOSITOR_EXPORT Compositor : public cc::LayerT
 
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
   void OnCompleteSwapWithNewSize(const gfx::Size& size);
 #endif
 
