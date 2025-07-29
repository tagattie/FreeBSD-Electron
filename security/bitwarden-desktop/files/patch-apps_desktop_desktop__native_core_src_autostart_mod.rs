--- apps/desktop/desktop_native/core/src/autostart/mod.rs.orig	2025-07-29 21:14:19 UTC
+++ apps/desktop/desktop_native/core/src/autostart/mod.rs
@@ -1,4 +1,5 @@
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "linux.rs")]
 #[cfg_attr(target_os = "windows", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 mod autostart_impl;
