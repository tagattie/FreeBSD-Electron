--- apps/desktop/desktop_native/autotype/src/freebsd.rs.orig	2025-08-21 08:56:34 UTC
+++ apps/desktop/desktop_native/autotype/src/freebsd.rs
@@ -0,0 +1,7 @@
+pub fn get_foreground_window_title() -> std::result::Result<String, ()> {
+    todo!("Bitwarden does not yet support FreeBSD autotype");
+}
+
+pub fn type_input(_input: Vec<u16>) -> std::result::Result<(), ()> {
+    todo!("Bitwarden does not yet support FreeBSD autotype");
+}
