--- cargo-crates/russh-cryptovec-0.50.2/src/platform/unix.rs.orig	2025-08-11 09:05:55 UTC
+++ cargo-crates/russh-cryptovec-0.50.2/src/platform/unix.rs
@@ -30,9 +30,9 @@ unsafe fn get_libc_error(msg: &str) -> String {
 }
 
 unsafe fn get_libc_error(msg: &str) -> String {
-    #[cfg(not(target_os = "macos"))]
+    #[cfg(not(any(target_os = "macos", target_os = "freebsd")))]
     let errno = *libc::__errno_location();
-    #[cfg(target_os = "macos")]
+    #[cfg(any(target_os = "macos", target_os = "freebsd"))]
     let errno = *libc::__error();
     const ERRMAXLEN: usize = 255;
     const INVALID_ERR: &str = "Unknown";
