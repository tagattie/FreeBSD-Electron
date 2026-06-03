--- apps/desktop/desktop_native/core/src/ssh_agent/mod.rs.orig	2026-05-29 16:42:52 UTC
+++ apps/desktop/desktop_native/core/src/ssh_agent/mod.rs
@@ -26,10 +26,10 @@ use tracing::{error, info};
 
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "unix.rs")]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 mod platform_ssh_agent;
 
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
 mod peercred_unix_listener_stream;
 
 pub mod peerinfo;
