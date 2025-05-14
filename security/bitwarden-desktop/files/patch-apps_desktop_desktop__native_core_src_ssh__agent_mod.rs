--- apps/desktop/desktop_native/core/src/ssh_agent/mod.rs.orig	2025-04-28 18:52:32 UTC
+++ apps/desktop/desktop_native/core/src/ssh_agent/mod.rs
@@ -10,10 +10,10 @@ use bitwarden_russh::ssh_agent::{self, Key};
 
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "unix.rs")]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 mod platform_ssh_agent;
 
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
 mod peercred_unix_listener_stream;
 
 pub mod peerinfo;
