--- apps/desktop/desktop_native/core/src/process_isolation/mod.rs.orig	2025-09-09 17:14:14 UTC
+++ apps/desktop/desktop_native/core/src/process_isolation/mod.rs
@@ -13,6 +13,7 @@
 
 #[allow(clippy::module_inception)]
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "freebsd.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod process_isolation;
