--- apps/desktop/desktop_native/core/src/password/mod.rs.orig	2026-03-27 19:20:46 UTC
+++ apps/desktop/desktop_native/core/src/password/mod.rs
@@ -4,7 +4,7 @@ pub const PASSWORD_NOT_FOUND: &str = "Password not fou
 pub const PASSWORD_NOT_FOUND: &str = "Password not found.";
 
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod password;
