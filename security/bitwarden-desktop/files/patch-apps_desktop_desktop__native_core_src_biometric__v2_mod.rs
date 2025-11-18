--- apps/desktop/desktop_native/core/src/biometric_v2/mod.rs.orig	2025-11-18 13:40:25 UTC
+++ apps/desktop/desktop_native/core/src/biometric_v2/mod.rs
@@ -1,7 +1,7 @@ use anyhow::Result;
 use anyhow::Result;
 
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 mod biometric_v2;
