--- apps/desktop/desktop_native/autotype/src/freebsd.rs.orig	2025-10-26 05:28:24 UTC
+++ apps/desktop/desktop_native/autotype/src/freebsd.rs
@@ -0,0 +1,7 @@
+pub fn get_foreground_window_title() -> anyhow::Result<String> {
+    todo!("Bitwarden does not yet support FreeBSD autotype");
+}
+
+pub fn type_input(_input: Vec<u16>, _keyboard_shortcut: Vec<String>) -> anyhow::Result<()> {
+    todo!("Bitwarden does not yet support FreeBSD autotype");
+}
