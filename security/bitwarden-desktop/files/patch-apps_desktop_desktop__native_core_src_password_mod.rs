--- apps/desktop/desktop_native/core/src/password/mod.rs.orig	2026-11-17 15:45:14 UTC
+++ apps/desktop/desktop_native/core/src/password/mod.rs
@@ -30,7 +30,7 @@ mod file;
 #[cfg(feature = "file_secure_storage")]
 mod file;
 
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod os;
