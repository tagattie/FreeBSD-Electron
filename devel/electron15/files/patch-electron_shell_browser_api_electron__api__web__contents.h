--- electron/shell/browser/api/electron_api_web_contents.h.orig	2021-11-15 23:45:07 UTC
+++ electron/shell/browser/api/electron_api_web_contents.h
@@ -686,7 +686,7 @@ class WebContents : public gin::Wrappable<WebContents>
 #if defined(TOOLKIT_VIEWS) && !defined(OS_MAC)
   ui::ImageModel GetDevToolsWindowIcon() override;
 #endif
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   void GetDevToolsWindowWMClass(std::string* name,
                                 std::string* class_name) override;
 #endif
