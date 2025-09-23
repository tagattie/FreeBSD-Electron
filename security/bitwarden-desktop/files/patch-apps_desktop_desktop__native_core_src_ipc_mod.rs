--- apps/desktop/desktop_native/core/src/ipc/mod.rs.orig	2025-09-09 17:14:14 UTC
+++ apps/desktop/desktop_native/core/src/ipc/mod.rs
@@ -73,7 +73,7 @@ pub fn path(name: &str) -> std::path::PathBuf {
         }
     }
 
-    #[cfg(any(target_os = "linux", target_os = "macos"))]
+    #[cfg(any(target_os = "linux", target_os = "macos", target_os = "freebsd"))]
     {
         // On Linux and unsandboxed Mac, we use the user's cache directory.
         let home = dirs::cache_dir().unwrap();
