--- content/browser/webui/web_ui_main_frame_observer.h.orig	2021-11-19 04:25:16 UTC
+++ content/browser/webui/web_ui_main_frame_observer.h
@@ -43,7 +43,7 @@ class CONTENT_EXPORT WebUIMainFrameObserver : public W
 
 // TODO(crbug.com/1129544) This is currently disabled due to Windows DLL
 // thunking issues. Fix & re-enable.
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // On official Google builds, capture and report JavaScript error messages on
   // WebUI surfaces back to Google. This allows us to fix JavaScript errors and
   // exceptions.
@@ -54,18 +54,18 @@ class CONTENT_EXPORT WebUIMainFrameObserver : public W
       int32_t line_no,
       const std::u16string& source_id,
       const absl::optional<std::u16string>& untrusted_stack_trace) override;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
   void ReadyToCommitNavigation(NavigationHandle* navigation_handle) override;
 
  private:
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   void MaybeEnableWebUIJavaScriptErrorReporting(
       NavigationHandle* navigation_handle);
 
   // Do we report JavaScript errors ?
   bool error_reporting_enabled_ = false;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
   WebUIImpl* web_ui_;
 };
