--- content/public/test/mock_render_thread.cc.orig	2023-02-01 18:43:19 UTC
+++ content/public/test/mock_render_thread.cc
@@ -65,7 +65,7 @@ class MockRenderMessageFilterImpl : public mojom::Rend
     std::move(callback).Run(false);
   }
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD)
   void SetThreadType(int32_t platform_thread_id,
                      base::ThreadType thread_type) override {}
 #endif
