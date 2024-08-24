--- apps/desktop/desktop_native/core/src/process_isolation/mod.rs.orig	2024-08-24 08:20:34 UTC
+++ apps/desktop/desktop_native/core/src/process_isolation/mod.rs
@@ -1,4 +1,5 @@
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "freebsd.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod process_isolation;
