--- chrome/browser/web_applications/components/web_app_file_handler_registration.h.orig	2021-09-14 01:51:52 UTC
+++ chrome/browser/web_applications/components/web_app_file_handler_registration.h
@@ -42,7 +42,7 @@ void UnregisterFileHandlersWithOs(const AppId& app_id,
                                   std::unique_ptr<ShortcutInfo> info,
                                   base::OnceCallback<void(bool)> callback);
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 using RegisterMimeTypesOnLinuxCallback =
     base::OnceCallback<bool(base::FilePath profile_path,
                             std::string file_contents)>;
