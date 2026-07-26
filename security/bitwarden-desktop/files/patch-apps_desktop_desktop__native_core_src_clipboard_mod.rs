--- apps/desktop/desktop_native/core/src/clipboard/mod.rs.orig	2026-07-26 11:43:38 UTC
+++ apps/desktop/desktop_native/core/src/clipboard/mod.rs
@@ -3,13 +3,13 @@ mod arboard_backend;
 mod arboard_backend;
 
 // Alternative portal-based clipboard path for GNOME.
-#[cfg(target_os = "linux")]
+#[cfg(any(target_os = "linux", target_os = "freebsd"))]
 mod portal_backend;
 
 /// Read the clipboard
 #[allow(clippy::unused_async)]
 pub async fn read() -> Result<String> {
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     if portal_backend::should_use_portal() {
         return portal_backend::read_clipboard().await;
     }
@@ -22,7 +22,7 @@ pub async fn write(text: &str, hide_from_history: bool
 /// Note: `hide_from_history` is best-effort and may be ignored depending on platform support.
 #[allow(clippy::unused_async)]
 pub async fn write(text: &str, hide_from_history: bool) -> Result<()> {
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     if portal_backend::should_use_portal() {
         return portal_backend::write_clipboard(text, hide_from_history).await;
     }
