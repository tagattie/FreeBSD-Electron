--- chrome/test/base/test_browser_window.h.orig	2021-11-19 04:25:11 UTC
+++ chrome/test/base/test_browser_window.h
@@ -200,7 +200,7 @@ class TestBrowserWindow : public BrowserWindow {
   void MaybeShowProfileSwitchIPH() override {}
 
 #if defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_WIN) || \
-    defined(OS_LINUX) || defined(OS_FUCHSIA)
+    defined(OS_LINUX) || defined(OS_FUCHSIA) || defined(OS_BSD)
   void ShowHatsDialog(
       const std::string& site_id,
       base::OnceClosure success_callback,
