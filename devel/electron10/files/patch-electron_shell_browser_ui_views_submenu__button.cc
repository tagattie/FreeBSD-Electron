--- electron/shell/browser/ui/views/submenu_button.cc.orig	2021-01-14 16:50:03 UTC
+++ electron/shell/browser/ui/views/submenu_button.cc
@@ -27,7 +27,7 @@ SubmenuButton::SubmenuButton(const base::string16& tit
           gfx::RemoveAcceleratorChar(title, '&', nullptr, nullptr),
           button_listener),
       background_color_(background_color) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Dont' use native style border.
   SetBorder(CreateDefaultBorder());
 #endif
