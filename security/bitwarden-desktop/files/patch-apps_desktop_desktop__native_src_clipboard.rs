--- apps/desktop/desktop_native/src/clipboard.rs.orig	2023-11-12 21:42:30 UTC
+++ apps/desktop/desktop_native/src/clipboard.rs
@@ -29,7 +29,7 @@ fn clipboard_set(set: Set, password: bool) -> Set {
 }
 
 // Wait for clipboard to be available on linux
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 fn clipboard_set(set: Set, _password: bool) -> Set {
     use arboard::SetExtLinux;
 
