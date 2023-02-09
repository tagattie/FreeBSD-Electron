--- apps/desktop/desktop_native/src/biometric/mod.rs.orig	2023-02-09 07:28:13 UTC
+++ apps/desktop/desktop_native/src/biometric/mod.rs
@@ -1,4 +1,4 @@
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod biometric;
