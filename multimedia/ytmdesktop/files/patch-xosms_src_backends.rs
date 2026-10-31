--- xosms/src/backends.rs.orig	2026-10-31 13:14:16 UTC
+++ xosms/src/backends.rs
@@ -11,9 +11,9 @@ pub use self::macos as backend;
 #[cfg(target_os = "macos")]
 pub use self::macos as backend;
 
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 pub mod linux;
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 pub use self::linux as backend;
 
 pub use common::PlatformBackend;
