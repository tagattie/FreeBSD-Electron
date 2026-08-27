--- apps/desktop/desktop_native/autotype/src/mvp/mod.rs.orig	2026-08-27 03:51:05 UTC
+++ apps/desktop/desktop_native/autotype/src/mvp/mod.rs
@@ -8,7 +8,7 @@ pub(crate) use modifier_keys::*;
 #[cfg(target_os = "windows")]
 pub(crate) use modifier_keys::*;
 
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 #[cfg_attr(target_os = "windows", path = "windows/mod.rs")]
 mod windowing;
