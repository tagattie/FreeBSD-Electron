--- apps/desktop/desktop_native/core/src/autostart/mod.rs.orig	2026-08-10 20:48:17 UTC
+++ apps/desktop/desktop_native/core/src/autostart/mod.rs
@@ -1,4 +1,4 @@
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "windows", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 mod autostart_impl;
