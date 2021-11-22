--- electron/shell/browser/ui/views/menu_bar.h.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/browser/ui/views/menu_bar.h
@@ -74,7 +74,7 @@ class MenuBar : public views::AccessiblePaneView,
   View* FindAccelChild(char16_t key);
 
   SkColor background_color_;
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   SkColor enabled_color_;
   SkColor disabled_color_;
 #endif
