--- apps/desktop/desktop_native/process_isolation/src/lib.rs.orig	2025-11-18 14:25:47 UTC
+++ apps/desktop/desktop_native/process_isolation/src/lib.rs
@@ -1,4 +1,4 @@
-#![cfg(target_os = "linux")]
+#![cfg(any(target_os = "linux", target_os = "freebsd"))]
 
 //! This library compiles to a pre-loadable shared object. When preloaded, it
 //! immediately isolates the process using the methods available on the platform.
