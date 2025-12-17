--- apps/desktop/desktop_native/core/src/biometric/mod.rs.orig	2025-12-11 21:15:41 UTC
+++ apps/desktop/desktop_native/core/src/biometric/mod.rs
@@ -2,7 +2,7 @@ use anyhow::{anyhow, Result};
 use anyhow::{anyhow, Result};
 
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "macos", path = "unimplemented.rs")]
 #[cfg_attr(target_os = "windows", path = "unimplemented.rs")]
 mod biometric;
