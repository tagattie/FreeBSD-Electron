--- ui/message_center/views/message_popup_view.cc.orig	2021-09-14 01:52:23 UTC
+++ ui/message_center/views/message_popup_view.cc
@@ -115,7 +115,7 @@ void MessagePopupView::Show() {
   params.z_order = ui::ZOrderLevel::kFloatingWindow;
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
   // Make the widget explicitly activatable as TYPE_POPUP is not activatable by
   // default but we need focus for the inline reply textarea.
   params.activatable = views::Widget::InitParams::Activatable::kYes;
