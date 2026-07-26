--- apps/desktop/desktop_native/core/src/biometric_v2/mod.rs.orig	2026-07-15 09:46:59 UTC
+++ apps/desktop/desktop_native/core/src/biometric_v2/mod.rs
@@ -7,6 +7,7 @@ use anyhow::Result;
 
 #[allow(clippy::module_inception)]
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 mod biometric_v2;
