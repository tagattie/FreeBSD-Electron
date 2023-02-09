--- apps/desktop/desktop_native/src/password/mod.rs.orig	2023-02-09 07:29:08 UTC
+++ apps/desktop/desktop_native/src/password/mod.rs
@@ -1,4 +1,4 @@
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod password;
