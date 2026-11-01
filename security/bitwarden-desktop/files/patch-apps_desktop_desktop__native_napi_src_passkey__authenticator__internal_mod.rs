--- apps/desktop/desktop_native/napi/src/passkey_authenticator_internal/mod.rs.orig	2026-11-01 09:19:43 UTC
+++ apps/desktop/desktop_native/napi/src/passkey_authenticator_internal/mod.rs
@@ -1,6 +1,6 @@
 #[cfg_attr(target_os = "windows", path = "windows.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 mod internal;
 pub use internal::*;
 
