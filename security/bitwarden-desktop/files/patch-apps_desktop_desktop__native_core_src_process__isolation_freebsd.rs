--- apps/desktop/desktop_native/core/src/process_isolation/freebsd.rs.orig	2025-09-23 18:59:56 UTC
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
+pub fn isolate_process() -> Result<()> {
+    bail!("Not implemented on FreeBSD")
+}
