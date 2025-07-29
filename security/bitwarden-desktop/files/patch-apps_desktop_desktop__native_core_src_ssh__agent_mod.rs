--- apps/desktop/desktop_native/core/src/ssh_agent/mod.rs.orig	2025-07-18 15:50:12 UTC
+++ apps/desktop/desktop_native/core/src/ssh_agent/mod.rs
@@ -14,10 +14,10 @@ use bitwarden_russh::{
 
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "unix.rs")]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 mod platform_ssh_agent;
 
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
 mod peercred_unix_listener_stream;
 
 pub mod peerinfo;
