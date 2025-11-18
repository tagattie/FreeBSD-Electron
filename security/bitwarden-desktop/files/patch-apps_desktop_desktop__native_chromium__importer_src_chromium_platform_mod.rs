--- apps/desktop/desktop_native/chromium_importer/src/chromium/platform/mod.rs.orig	2025-11-18 13:21:12 UTC
+++ apps/desktop/desktop_native/chromium_importer/src/chromium/platform/mod.rs
@@ -1,5 +1,5 @@
 // Platform-specific code
-#[cfg_attr(target_os = "linux", path = "linux.rs")]
+#[cfg_attr(any(target_os = "linux", target_os = "freebsd"), path = "linux.rs")]
 #[cfg_attr(target_os = "windows", path = "windows/mod.rs")]
 #[cfg_attr(target_os = "macos", path = "macos.rs")]
 mod native;
