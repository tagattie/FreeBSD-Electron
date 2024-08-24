--- apps/desktop/desktop_native/core/src/powermonitor/mod.rs.orig	2024-08-24 08:16:01 UTC
+++ apps/desktop/desktop_native/core/src/powermonitor/mod.rs
@@ -1,4 +1,4 @@
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "windows", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 mod powermonitor;
