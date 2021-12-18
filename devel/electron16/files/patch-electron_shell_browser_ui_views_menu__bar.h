--- electron/shell/browser/ui/views/menu_bar.h.orig	2021-12-03 01:46:05 UTC
+++ electron/shell/browser/ui/views/menu_bar.h
@@ -75,7 +75,7 @@ class MenuBar : public views::AccessiblePaneView,
   View* FindAccelChild(char16_t key);
 
   SkColor background_color_;
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   SkColor enabled_color_;
   SkColor disabled_color_;
 #endif
