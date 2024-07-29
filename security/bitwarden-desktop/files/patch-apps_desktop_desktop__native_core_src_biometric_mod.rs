--- apps/desktop/desktop_native/core/src/biometric/mod.rs.orig	2024-07-29 07:51:53 UTC
+++ apps/desktop/desktop_native/core/src/biometric/mod.rs
@@ -1,6 +1,6 @@ use anyhow::Result;
 use anyhow::Result;
 
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod biometric;
