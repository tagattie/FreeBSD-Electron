--- apps/desktop/desktop_native/core/src/ipc/mod.rs.orig	2026-10-26 11:20:46 UTC
+++ apps/desktop/desktop_native/core/src/ipc/mod.rs
@@ -35,7 +35,7 @@ pub const FLATPAK_PATHS: [&str; 4] = [
 
 /// The paths to where the native messaging files live on unsandboxed (deb, rpm, appimage)
 /// environments.
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 pub const UNSANDBOXED_PATHS: [&str; 4] = [
     ".config/chromium/NativeMessagingHosts",
     ".config/google-chrome/NativeMessagingHosts",
@@ -99,7 +99,7 @@ fn app_group_container() -> Option<std::path::PathBuf>
 
 /// The directory under the user's cache directory that holds the sockets when no App Group
 /// container is used.
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "macos", target_os = "freebsd"))]
 fn cache_dir_name() -> String {
     #[cfg(target_os = "macos")]
     {
@@ -160,7 +160,7 @@ pub fn path(name: &str) -> std::path::PathBuf {
         }
     }
 
-    #[cfg(any(target_os = "linux", target_os = "macos"))]
+    #[cfg(any(target_os = "linux", target_os = "macos", target_os = "freebsd"))]
     {
         // On Linux, and on Mac when no App Group container is available (unsigned dev
         // builds), we use the user's cache directory.
