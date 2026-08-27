--- apps/desktop/desktop_native/biometric/src/lib.rs.orig	2026-08-27 03:54:25 UTC
+++ apps/desktop/desktop_native/biometric/src/lib.rs
@@ -6,7 +6,7 @@ use anyhow::Result;
 use anyhow::Result;
 
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 mod biometric;
