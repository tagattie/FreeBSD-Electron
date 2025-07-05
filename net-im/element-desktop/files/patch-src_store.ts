--- src/store.ts.orig	2025-07-01 15:32:42 UTC
+++ src/store.ts
@@ -167,7 +167,7 @@ class Store extends ElectronStore<StoreData> {
         Store.internalInstance = store;
 
         if (
-            process.platform === "linux" &&
+            (process.platform === "linux" || process.platform === "freebsd") &&
             (store.get("safeStorageBackendOverride") || store.get("safeStorageBackendMigrate"))
         ) {
             const backend = store.get("safeStorageBackend")!;
@@ -255,7 +255,7 @@ class Store extends ElectronStore<StoreData> {
             return "plaintext";
         }
 
-        if (process.platform === "linux") {
+        if (process.platform === "linux" || process.platform === "freebsd") {
             // The following enables plain text encryption if the backend used is basic_text.
             // It has no significance for any other backend.
             // We do this early so that in case we end up using the basic_text backend (either because that's the only one available
