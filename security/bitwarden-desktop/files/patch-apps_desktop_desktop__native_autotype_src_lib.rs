--- apps/desktop/desktop_native/autotype/src/lib.rs.orig	2026-02-02 09:34:46 UTC
+++ apps/desktop/desktop_native/autotype/src/lib.rs
@@ -7,6 +7,7 @@ pub(crate) use modifier_keys::*;
 pub(crate) use modifier_keys::*;
 
 #[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(target_os = "freebsd", path = "freebsd.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 #[cfg_attr(target_os = "windows", path = "windows/mod.rs")]
 mod windowing;
