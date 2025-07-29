--- apps/desktop/desktop_native/core/src/clipboard.rs.orig	2025-07-18 15:50:12 UTC
+++ apps/desktop/desktop_native/core/src/clipboard.rs
@@ -29,7 +29,7 @@ fn clipboard_set(set: Set, password: bool) -> Set {
 }
 
 // Wait for clipboard to be available on linux
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 fn clipboard_set(set: Set, password: bool) -> Set {
     use arboard::SetExtLinux;
 
@@ -56,7 +56,7 @@ mod tests {
     use super::*;
 
     #[test]
-    #[cfg(any(feature = "manual_test", not(target_os = "linux")))]
+    #[cfg(any(feature = "manual_test", not(any(target_os = "linux", target_os = "freebsd"))))]
     fn test_write_read() {
         let message = "Hello world!";
 
