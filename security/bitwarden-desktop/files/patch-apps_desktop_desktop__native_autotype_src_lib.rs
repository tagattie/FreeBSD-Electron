--- apps/desktop/desktop_native/autotype/src/lib.rs.orig	2025-10-10 16:12:57 UTC
+++ apps/desktop/desktop_native/autotype/src/lib.rs
@@ -1,6 +1,7 @@ use anyhow::Result;
 use anyhow::Result;
 
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "freebsd.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 mod windowing;
