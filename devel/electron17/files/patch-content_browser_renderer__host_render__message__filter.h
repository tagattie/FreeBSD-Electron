--- content/browser/renderer_host/render_message_filter.h.orig	2022-05-11 07:16:51 UTC
+++ content/browser/renderer_host/render_message_filter.h
@@ -78,14 +78,14 @@ class RenderMessageFilter
   void GenerateRoutingID(GenerateRoutingIDCallback routing_id) override;
   void GenerateFrameRoutingID(GenerateFrameRoutingIDCallback callback) override;
   void HasGpuProcess(HasGpuProcessCallback callback) override;
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   void SetThreadPriority(int32_t ns_tid,
                          base::ThreadPriority priority) override;
 #endif
 
   void OnResolveProxy(const GURL& url, IPC::Message* reply_msg);
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   void SetThreadPriorityOnFileThread(base::PlatformThreadId ns_tid,
                                      base::ThreadPriority priority);
 #endif
