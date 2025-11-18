--- apps/desktop/desktop_native/core/src/process_isolation/freebsd.rs.orig	2025-11-18 14:32:14 UTC
+++ apps/desktop/desktop_native/core/src/process_isolation/freebsd.rs
@@ -0,0 +1,56 @@
+use anyhow::{bail, Result};
+use libc;
+use tracing::info;
+
+pub fn disable_coredumps() -> Result<()> {
+    let rlimit = libc::rlimit {
+        rlim_cur: 0,
+        rlim_max: 0,
+    };
+    info!("Disabling core dumps via setrlimit.");
+
+    if unsafe { libc::setrlimit(libc::RLIMIT_CORE, &rlimit) } != 0 {
+        let e = std::io::Error::last_os_error();
+        return Err(anyhow::anyhow!(
+            "failed to disable core dumping, memory might be persisted to disk on crashes {}",
+            e
+        ));
+    }
+
+    Ok(())
+}
+
+pub fn is_core_dumping_disabled() -> Result<bool> {
+    let mut rlimit = libc::rlimit {
+        rlim_cur: 0,
+        rlim_max: 0,
+    };
+    if unsafe { libc::getrlimit(libc::RLIMIT_CORE, &mut rlimit) } != 0 {
+        let e = std::io::Error::last_os_error();
+        return Err(anyhow::anyhow!("failed to get core dump limit {}", e));
+    }
+
+    Ok(rlimit.rlim_cur == 0 && rlimit.rlim_max == 0)
+}
+
+pub fn isolate_process() -> Result<()> {
+    let pid = std::process::id();
+    info!(
+        pid,
+        "Disabling ptrace and memory access for main via PROC_TRACE_CTL_DISABLE_EXEC."
+    );
+
+    let mut arg = libc::PROC_TRACE_CTL_DISABLE_EXEC;
+    if unsafe {
+        libc::procctl(libc::P_PID, 0, libc::PROC_TRACE_CTL, &mut arg as *mut _ as *mut libc::
+c_void)
+    } != 0 {
+        let e = std::io::Error::last_os_error();
+        return Err(anyhow::anyhow!(
+            "failed to disable memory dumping, memory may be accessible by other processes {}",
+            e
+        ));
+    }
+
+    Ok(())
+}
