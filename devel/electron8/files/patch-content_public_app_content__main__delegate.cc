--- content/public/app/content_main_delegate.cc.orig	2020-03-03 07:03:00 UTC
+++ content/public/app/content_main_delegate.cc
@@ -38,13 +38,13 @@ bool ContentMainDelegate::DelaySandboxInitialization(
   return false;
 }
 
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
 
 void ContentMainDelegate::ZygoteStarting(
     std::vector<std::unique_ptr<service_manager::ZygoteForkDelegate>>*
         delegates) {}
 
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
 
 int ContentMainDelegate::TerminateForFatalInitializationError() {
   CHECK(false);
