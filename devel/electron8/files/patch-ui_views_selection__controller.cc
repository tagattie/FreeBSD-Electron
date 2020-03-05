--- ui/views/selection_controller.cc.orig	2020-03-03 07:04:29 UTC
+++ ui/views/selection_controller.cc
@@ -22,7 +22,7 @@ SelectionController::SelectionController(SelectionCont
       delegate_(delegate),
       handles_selection_clipboard_(false) {
 // On Linux, update the selection clipboard on a text selection.
-#if defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if (defined(OS_LINUX) || defined(OS_BSD)) && !defined(OS_CHROMEOS)
   set_handles_selection_clipboard(true);
 #endif
 
