--- apps/desktop/desktop_native/core/src/ipc/mod.rs.orig	2024-10-22 13:52:39 UTC
+++ apps/desktop/desktop_native/core/src/ipc/mod.rs
@@ -53,7 +53,7 @@ pub fn path(name: &str) -> std::path::PathBuf {
         tmp.join(format!("app.{name}"))
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     {
         // On Linux, we use the user's cache directory.
         let home = dirs::cache_dir().unwrap();
