--- chrome/browser/ui/views/tabs/tab.cc.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/ui/views/tabs/tab.cc
@@ -581,7 +581,7 @@ void Tab::MaybeUpdateHoverStatus(const ui::MouseEvent&
   if (mouse_hovered_ || !GetWidget()->IsMouseEventsEnabled())
     return;
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // Move the hit test area for hovering up so that it is not overlapped by tab
   // hover cards when they are shown.
   // TODO(crbug.com/978134): Once Linux/CrOS widget transparency is solved,
