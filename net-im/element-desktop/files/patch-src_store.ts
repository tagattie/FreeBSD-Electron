--- src/store.ts.orig	2025-05-23 12:27:02 UTC
+++ src/store.ts
@@ -157,7 +157,7 @@ class Store extends ElectronStore<StoreData> {
         const store = new Store(mode ?? Mode.Encrypted);
         Store.internalInstance = store;
 
-        if (process.platform === "linux" && store.get("safeStorageBackendOverride")) {
+        if ((process.platform === "linux" || process.platform === "freebsd") && store.get("safeStorageBackendOverride")) {
             const backend = store.get("safeStorageBackend")!;
             if (backend in safeStorageBackendMap) {
                 // If the safeStorage backend which was used to write the data is one we can specify via the commandLine
@@ -237,7 +237,7 @@ class Store extends ElectronStore<StoreData> {
         await app.whenReady();
 
         let safeStorageBackend = this.get("safeStorageBackend");
-        if (process.platform === "linux") {
+        if (process.platform === "linux" || process.platform === "freebsd") {
             // Linux safeStorage support is hellish, the support varies on the Desktop Environment used rather than the store itself.
             // https://github.com/electron/electron/issues/39789 https://github.com/microsoft/vscode/issues/185212
             const selectedSafeStorageBackend = safeStorage.getSelectedStorageBackend();
