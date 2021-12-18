--- content/browser/renderer_host/render_process_host_impl.h.orig	2021-11-19 04:25:16 UTC
+++ content/browser/renderer_host/render_process_host_impl.h
@@ -464,10 +464,10 @@ class CONTENT_EXPORT RenderProcessHostImpl
   // Sets this RenderProcessHost to be guest only. For Testing only.
   void SetForGuestsOnlyForTesting();
 
-#if defined(OS_POSIX) && !defined(OS_ANDROID) && !defined(OS_MAC)
+#if defined(OS_POSIX) && !defined(OS_ANDROID) && !defined(OS_MAC) && !defined(OS_BSD)
   // Launch the zygote early in the browser startup.
   static void EarlyZygoteLaunch();
-#endif  // defined(OS_POSIX) && !defined(OS_ANDROID) && !defined(OS_MAC)
+#endif  // defined(OS_POSIX) && !defined(OS_ANDROID) && !defined(OS_MAC) && !defined(OS_BSD)
 
   // Called when a video capture stream or an audio stream is added or removed
   // and used to determine if the process should be backgrounded or not.
