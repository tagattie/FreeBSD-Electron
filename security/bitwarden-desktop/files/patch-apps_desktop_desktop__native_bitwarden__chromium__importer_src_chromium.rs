--- apps/desktop/desktop_native/bitwarden_chromium_importer/src/chromium.rs.orig	2025-09-23 19:04:00 UTC
+++ apps/desktop/desktop_native/bitwarden_chromium_importer/src/chromium.rs
@@ -8,7 +8,7 @@ use rusqlite::{params, Connection};
 use rusqlite::{params, Connection};
 
 // Platform-specific code
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod platform;
