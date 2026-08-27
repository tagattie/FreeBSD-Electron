--- apps/desktop/desktop_native/core/src/autofill/mod.rs.orig	2026-08-10 20:48:17 UTC
+++ apps/desktop/desktop_native/core/src/autofill/mod.rs
@@ -1,5 +1,5 @@
 #[allow(clippy::module_inception)]
-#[cfg_attr(target_os = "linux", path = "unix.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "unix.rs")]
 #[cfg_attr(target_os = "windows", path = "windows/mod.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod autofill;
