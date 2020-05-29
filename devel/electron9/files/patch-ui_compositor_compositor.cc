--- ui/compositor/compositor.cc.orig	2020-05-26 08:03:35 UTC
+++ ui/compositor/compositor.cc
@@ -695,7 +695,7 @@ void Compositor::OnFrameTokenChanged(uint32_t frame_to
   NOTREACHED();
 }
 
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) && !defined(OS_CHROMEOS)) || defined(OS_BSD)
 void Compositor::OnCompleteSwapWithNewSize(const gfx::Size& size) {
   for (auto& observer : observer_list_)
     observer.OnCompositingCompleteSwapWithNewSize(this, size);
