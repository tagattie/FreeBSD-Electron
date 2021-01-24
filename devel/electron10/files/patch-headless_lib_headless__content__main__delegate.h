--- headless/lib/headless_content_main_delegate.h.orig	2020-09-21 18:39:18 UTC
+++ headless/lib/headless_content_main_delegate.h
@@ -57,7 +57,7 @@ class HEADLESS_EXPORT HeadlessContentMainDelegate
 
   HeadlessBrowserImpl* browser() const { return browser_.get(); }
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   void ZygoteForked() override;
 #endif
 
