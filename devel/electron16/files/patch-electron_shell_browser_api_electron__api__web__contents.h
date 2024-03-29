--- electron/shell/browser/api/electron_api_web_contents.h.orig	2022-05-24 16:31:07 UTC
+++ electron/shell/browser/api/electron_api_web_contents.h
@@ -716,7 +716,7 @@ class WebContents : public ExclusiveAccessContext,
 #if defined(TOOLKIT_VIEWS) && !defined(OS_MAC)
   ui::ImageModel GetDevToolsWindowIcon() override;
 #endif
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   void GetDevToolsWindowWMClass(std::string* name,
                                 std::string* class_name) override;
 #endif
