--- apps/desktop/desktop_native/napi/index.js.orig	2025-12-17 07:57:16 UTC
+++ apps/desktop/desktop_native/napi/index.js
@@ -112,6 +112,24 @@ switch (platform) {
         throw new Error(`Unsupported architecture on Linux: ${arch}`);
     }
     break;
+  case "freebsd":
+    switch (arch) {
+      case "x64":
+        nativeBinding = loadFirstAvailable(
+          ["desktop_napi.freebsd-x64.node"],
+          "@bitwarden/desktop-napi-darwin-x64",
+        );
+        break;
+      case "arm64":
+        nativeBinding = loadFirstAvailable(
+          ["desktop_napi.freebsd-arm64.node"],
+          "@bitwarden/desktop-napi-darwin-arm64",
+        );
+        break;
+      default:
+        throw new Error(`Unsupported architecture on macOS: ${arch}`);
+    }
+    break;
   default:
     throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
 }
