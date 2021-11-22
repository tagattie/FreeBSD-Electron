--- electron/shell/browser/ui/views/menu_bar.cc.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/browser/ui/views/menu_bar.cc
@@ -12,7 +12,7 @@
 #include "ui/views/background.h"
 #include "ui/views/layout/box_layout.h"
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include "ui/gtk/gtk_util.h"
 #endif
 
@@ -199,7 +199,7 @@ void MenuBar::ButtonPressed(int id, const ui::Event& e
 void MenuBar::RefreshColorCache() {
   const ui::NativeTheme* theme = GetNativeTheme();
   if (theme) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
     background_color_ = gtk::GetBgColor("GtkMenuBar#menubar");
     enabled_color_ =
         gtk::GetFgColor("GtkMenuBar#menubar GtkMenuItem#menuitem GtkLabel");
@@ -231,7 +231,7 @@ void MenuBar::UpdateViewColors() {
   // set child colors
   if (menu_model_ == nullptr)
     return;
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   const auto& textColor =
       window_->IsFocused() ? enabled_color_ : disabled_color_;
   for (auto* child : GetChildrenInZOrder()) {
