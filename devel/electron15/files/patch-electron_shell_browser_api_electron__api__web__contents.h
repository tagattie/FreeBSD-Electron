--- electron/shell/browser/api/electron_api_web_contents.h.orig	2022-05-24 14:51:39 UTC
+++ electron/shell/browser/api/electron_api_web_contents.h
@@ -690,7 +690,7 @@ class WebContents : public gin::Wrappable<WebContents>
 #if defined(TOOLKIT_VIEWS) && !defined(OS_MAC)
   ui::ImageModel GetDevToolsWindowIcon() override;
 #endif
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   void GetDevToolsWindowWMClass(std::string* name,
                                 std::string* class_name) override;
 #endif
