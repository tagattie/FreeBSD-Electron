--- electron/shell/browser/native_window.cc.orig	2022-05-04 15:34:57 UTC
+++ electron/shell/browser/native_window.cc
@@ -158,7 +158,7 @@ void NativeWindow::InitFromOptions(const gin_helper::D
   } else {
     SetSizeConstraints(size_constraints);
   }
-#if defined(OS_WIN) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD)
   bool resizable;
   if (options.Get(options::kResizable, &resizable)) {
     SetResizable(resizable);
