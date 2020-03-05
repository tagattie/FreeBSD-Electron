--- electron/shell/browser/native_window_views.h.orig	2020-03-02 19:30:38 UTC
+++ electron/shell/browser/native_window_views.h
@@ -209,7 +209,7 @@ class NativeWindowViews : public NativeWindow,
       content::WebContents*,
       const content::NativeWebKeyboardEvent& event) override;
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // ui::EventHandler:
   void OnMouseEvent(ui::MouseEvent* event) override;
 #endif
