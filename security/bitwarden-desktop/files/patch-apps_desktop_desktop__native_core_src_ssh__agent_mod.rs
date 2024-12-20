--- apps/desktop/desktop_native/core/src/ssh_agent/mod.rs.orig	2024-12-20 08:16:03 UTC
+++ apps/desktop/desktop_native/core/src/ssh_agent/mod.rs
@@ -7,7 +7,7 @@ use bitwarden_russh::ssh_agent::{self, Key};
 
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "unix.rs")]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 mod platform_ssh_agent;
 
 pub mod generator;
