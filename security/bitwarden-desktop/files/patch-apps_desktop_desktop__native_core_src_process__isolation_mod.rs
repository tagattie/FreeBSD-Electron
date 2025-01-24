--- apps/desktop/desktop_native/core/src/process_isolation/mod.rs.orig	2025-01-23 11:12:57 UTC
+++ apps/desktop/desktop_native/core/src/process_isolation/mod.rs
@@ -1,5 +1,6 @@
 #[allow(clippy::module_inception)]
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "freebsd.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod process_isolation;
