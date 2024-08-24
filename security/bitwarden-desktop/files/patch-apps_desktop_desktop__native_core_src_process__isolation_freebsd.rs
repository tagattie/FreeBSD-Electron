--- apps/desktop/desktop_native/core/src/process_isolation/freebsd.rs.orig	2024-08-24 08:19:46 UTC
+++ apps/desktop/desktop_native/core/src/process_isolation/freebsd.rs
@@ -0,0 +1,13 @@
+use anyhow::{bail, Result};
+
+pub fn disable_coredumps() -> Result<()> {
+    bail!("Not implemented on FreeBSD")
+}
+
+pub fn is_core_dumping_disabled() -> Result<bool> {
+    bail!("Not implemented on FreeBSD")
+}
+
+pub fn disable_memory_access() -> Result<()> {
+    bail!("Not implemented on FreeBSD")
+}
