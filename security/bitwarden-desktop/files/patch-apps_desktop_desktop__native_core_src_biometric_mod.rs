--- apps/desktop/desktop_native/core/src/biometric/mod.rs.orig	2024-08-23 02:03:28 UTC
+++ apps/desktop/desktop_native/core/src/biometric/mod.rs
@@ -1,7 +1,7 @@ use anyhow::{anyhow, Result};
 use aes::cipher::generic_array::GenericArray;
 use anyhow::{anyhow, Result};
 
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod biometric;
