--- apps/desktop/desktop_native/chromium_importer/src/metadata.rs.orig	2026-05-29 16:42:52 UTC
+++ apps/desktop/desktop_native/chromium_importer/src/metadata.rs
@@ -131,7 +131,7 @@ mod tests {
         }
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     #[test]
     fn returns_all_known_importers() {
         let map = get_supported_importers::<MockInstalledBrowserRetriever>(false);
@@ -152,7 +152,7 @@ mod tests {
         }
     }
 
-    #[cfg(target_os = "linux")]
+    #[cfg(any(target_os = "linux", target_os = "freebsd"))]
     #[test]
     fn linux_specific_loaders_match_const_array() {
         let map = get_supported_importers::<MockInstalledBrowserRetriever>(false);
