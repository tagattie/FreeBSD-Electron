--- xosms/src/backends/error.rs.orig	2026-10-31 13:17:30 UTC
+++ xosms/src/backends/error.rs
@@ -7,7 +7,7 @@ pub enum WindowsPlatformError {
   HResult(windows_core::HRESULT),
 }
 
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 #[derive(Debug)]
 pub enum LinuxPlatformError {
   ZBus(zbus::Error),
@@ -17,7 +17,7 @@ pub enum PlatformBackendError {
 pub enum PlatformBackendError {
   #[cfg(target_os = "windows")]
   Windows(WindowsPlatformError),
-  #[cfg(target_os = "linux")]
+  #[cfg(any(target_os = "linux", target_os = "freebsd"))]
   Linux(LinuxPlatformError),
 }
 
@@ -35,7 +35,7 @@ impl From<windows_core::Error> for XosmsError {
   }
 }
 
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 impl From<zbus::Error> for XosmsError {
   fn from(value: zbus::Error) -> Self {
     XosmsError::PlatformBackend(PlatformBackendError::Linux(LinuxPlatformError::ZBus(value)))
