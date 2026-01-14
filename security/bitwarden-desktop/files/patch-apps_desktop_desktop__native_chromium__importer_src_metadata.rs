--- apps/desktop/desktop_native/chromium_importer/src/metadata.rs.orig	2026-01-07 19:48:19 UTC
+++ apps/desktop/desktop_native/chromium_importer/src/metadata.rs
@@ -127,7 +127,7 @@ mod tests {
         }
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     #[test]
     fn returns_all_known_importers() {
         let map = get_supported_importers::<MockInstalledBrowserRetriever>();
@@ -148,7 +148,7 @@ mod tests {
         }
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     #[test]
     fn linux_specific_loaders_match_const_array() {
         let map = get_supported_importers::<MockInstalledBrowserRetriever>();
