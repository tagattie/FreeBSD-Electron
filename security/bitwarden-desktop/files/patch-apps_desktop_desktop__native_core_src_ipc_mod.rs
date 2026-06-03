--- apps/desktop/desktop_native/core/src/ipc/mod.rs.orig	2026-05-29 16:42:52 UTC
+++ apps/desktop/desktop_native/core/src/ipc/mod.rs
@@ -34,7 +34,7 @@ pub const FLATPAK_PATHS: [&str; 4] = [
 
 /// The paths to where the native messaging files live on unsandboxed (deb, rpm, appimage)
 /// environments.
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 pub const UNSANDBOXED_PATHS: [&str; 4] = [
     ".config/chromium/NativeMessagingHosts",
     ".config/google-chrome/NativeMessagingHosts",
@@ -96,7 +96,7 @@ pub fn path(name: &str) -> std::path::PathBuf {
         }
     }
 
-    #[cfg(any(target_os = "linux", target_os = "macos"))]
+    #[cfg(any(target_os = "linux", target_os = "macos", target_os = "freebsd"))]
     {
         // On Linux and unsandboxed Mac, we use the user's cache directory.
         let home = dirs::cache_dir().expect("Could not find user cache directory");
