--- apps/desktop/desktop_native/core/src/powermonitor/mod.rs.orig	2025-01-23 11:12:57 UTC
+++ apps/desktop/desktop_native/core/src/powermonitor/mod.rs
@@ -1,5 +1,5 @@
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "windows", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 mod powermonitor;
