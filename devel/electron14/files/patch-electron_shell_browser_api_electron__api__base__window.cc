--- electron/shell/browser/api/electron_api_base_window.cc.orig	2021-11-30 21:29:29 UTC
+++ electron/shell/browser/api/electron_api_base_window.cc
@@ -1052,7 +1052,7 @@ void BaseWindow::SetIconImpl(v8::Isolate* isolate,
   static_cast<NativeWindowViews*>(window_.get())
       ->SetIcon(native_image->GetHICON(GetSystemMetrics(SM_CXSMICON)),
                 native_image->GetHICON(GetSystemMetrics(SM_CXICON)));
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   static_cast<NativeWindowViews*>(window_.get())
       ->SetIcon(native_image->image().AsImageSkia());
 #endif
