--- ui/views/views_delegate.h.orig	2021-11-19 04:25:48 UTC
+++ ui/views/views_delegate.h
@@ -140,7 +140,7 @@ class VIEWS_EXPORT ViewsDelegate {
   // environment.
   virtual bool IsWindowInMetro(gfx::NativeWindow window) const;
 #elif BUILDFLAG(ENABLE_DESKTOP_AURA) && \
-    (defined(OS_LINUX) || defined(OS_CHROMEOS))
+    (defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD))
   virtual gfx::ImageSkia* GetDefaultWindowIcon() const;
 #endif
 
