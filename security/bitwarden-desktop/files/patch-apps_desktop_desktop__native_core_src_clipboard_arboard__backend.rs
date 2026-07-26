--- apps/desktop/desktop_native/core/src/clipboard/arboard_backend.rs.orig	2026-07-26 11:42:51 UTC
+++ apps/desktop/desktop_native/core/src/clipboard/arboard_backend.rs
@@ -31,7 +31,7 @@ fn clipboard_set(set: Set, hide_from_history: bool) ->
 }
 
 // Wait for clipboard to be available on linux
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 fn clipboard_set(set: Set, hide_from_history: bool) -> Set {
     use arboard::SetExtLinux;
 
@@ -58,7 +58,7 @@ mod tests {
     use super::*;
 
     #[test]
-    #[cfg(any(feature = "manual_test", not(target_os = "linux")))]
+    #[cfg(any(feature = "manual_test", not(any(target_os = "linux", target_os = "freebsd"))))]
     fn test_write_read() {
         let message = "Hello world!";
 
