--- chrome/browser/web_applications/components/web_app_file_handler_registration.h.orig	2021-10-08 06:25:42 UTC
+++ chrome/browser/web_applications/components/web_app_file_handler_registration.h
@@ -40,7 +40,7 @@ void UnregisterFileHandlersWithOs(const AppId& app_id,
                                   Profile* profile,
                                   base::OnceCallback<void(bool)> callback);
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 using RegisterMimeTypesOnLinuxCallback =
     base::OnceCallback<bool(base::FilePath profile_path,
                             std::string file_contents)>;
