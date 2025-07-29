--- apps/desktop/desktop_native/core/src/password/mod.rs.orig	2025-07-18 15:50:12 UTC
+++ apps/desktop/desktop_native/core/src/password/mod.rs
@@ -1,7 +1,7 @@ pub const PASSWORD_NOT_FOUND: &str = "Password not fou
 pub const PASSWORD_NOT_FOUND: &str = "Password not found.";
 
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod password;
