--- electron/shell/browser/ui/views/inspectable_web_contents_view_views.cc.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/browser/ui/views/inspectable_web_contents_view_views.cc
@@ -182,7 +182,7 @@ void InspectableWebContentsViewViews::SetIsDocked(bool
     params.delegate = devtools_window_delegate_;
     params.bounds = inspectable_web_contents()->GetDevToolsBounds();
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
     params.wm_role_name = "devtools";
     if (GetDelegate())
       GetDelegate()->GetDevToolsWindowWMClass(&params.wm_class_name,
