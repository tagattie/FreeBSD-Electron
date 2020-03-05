--- electron/shell/browser/browser.h.orig	2020-03-02 19:30:38 UTC
+++ electron/shell/browser/browser.h
@@ -219,10 +219,10 @@ class Browser : public WindowListObserver {
   PCWSTR GetAppUserModelID();
 #endif  // defined(OS_WIN)
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Whether Unity launcher is running.
   bool IsUnityRunning();
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
 
   // Tell the application to open a file.
   bool OpenFile(const std::string& file_path);
@@ -301,7 +301,7 @@ class Browser : public WindowListObserver {
 
   std::unique_ptr<util::Promise<void*>> ready_promise_;
 
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
   base::Value about_panel_options_;
 #elif defined(OS_MACOSX)
   base::DictionaryValue about_panel_options_;
