--- packages/onenote-converter/node_modules/wasm-pack/binary.js.orig	2025-05-12 14:40:40 UTC
+++ packages/onenote-converter/node_modules/wasm-pack/binary.js
@@ -17,6 +17,10 @@ const getPlatform = () => {
   if (type === "Linux" && arch === "arm64") {
     return "aarch64-unknown-linux-musl";
   }
+  // dummy just to avoid unsupported platform error
+  if (type === "FreeBSD" && arch === "x64") {
+    return "x86_64-unknown-linux-musl";
+  }
   if (type === "Darwin" && (arch === "x64" || arch === "arm64")) {
     return "x86_64-apple-darwin";
   }
