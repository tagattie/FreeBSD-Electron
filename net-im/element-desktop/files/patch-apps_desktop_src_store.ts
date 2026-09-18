--- apps/desktop/src/store.ts.orig	2026-09-16 12:11:52 UTC
+++ apps/desktop/src/store.ts
@@ -184,7 +184,7 @@ class Store extends ElectronStore<StoreData> {
         Store.internalInstance = store;
 
         if (
-            process.platform === "linux" &&
+            (process.platform === "linux" || process.platform === "freebsd") &&
             (store.get("safeStorageBackendOverride") || store.get("safeStorageBackendMigrate"))
         ) {
             const backend = store.get("safeStorageBackend")!;
@@ -276,7 +276,7 @@ class Store extends ElectronStore<StoreData> {
             return "plaintext";
         }
 
-        if (process.platform === "linux") {
+        if (process.platform === "linux" || process.platform === "freebsd") {
             // The following enables plain text encryption if the backend used is basic_text.
             // It has no significance for any other backend.
             // We do this early so that in case we end up using the basic_text backend (either because that's the only one available
