--- apps/desktop/desktop_native/autotype/src/lib.rs.orig	2025-08-21 08:56:48 UTC
+++ apps/desktop/desktop_native/autotype/src/lib.rs
@@ -1,4 +1,5 @@
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "freebsd.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 mod windowing;
