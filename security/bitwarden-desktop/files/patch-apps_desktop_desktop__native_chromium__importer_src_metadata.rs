--- apps/desktop/desktop_native/chromium_importer/src/metadata.rs.orig	2026-02-02 09:34:46 UTC
+++ apps/desktop/desktop_native/chromium_importer/src/metadata.rs
@@ -130,7 +130,7 @@ mod tests {
         }
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     #[test]
     fn returns_all_known_importers() {
         let map = get_supported_importers::<MockInstalledBrowserRetriever>();
@@ -151,7 +151,7 @@ mod tests {
         }
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     #[test]
     fn linux_specific_loaders_match_const_array() {
         let map = get_supported_importers::<MockInstalledBrowserRetriever>();
