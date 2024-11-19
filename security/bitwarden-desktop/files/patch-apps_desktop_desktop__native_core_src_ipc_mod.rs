--- apps/desktop/desktop_native/core/src/ipc/mod.rs.orig	2024-11-14 17:11:53 UTC
+++ apps/desktop/desktop_native/core/src/ipc/mod.rs
@@ -60,7 +60,7 @@ pub fn path(name: &str) -> std::path::PathBuf {
         dir.join(format!("app.{name}"))
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     {
         // On Linux, we use the user's cache directory.
         let home = dirs::cache_dir().unwrap();
