--- src/main/cli.ts.orig	2026-11-05 17:23:08 UTC
+++ src/main/cli.ts
@@ -63,7 +63,7 @@ const extraOptions = {
         argumentName: "feature1,feature2,…"
     },
     "ozone-platform": {
-        hidden: process.platform !== "linux",
+        hidden: process.platform !== "linux" && process.platform !== "freebsd",
         type: "string",
         description: "Whether to run Vesktop in Wayland or X11 (XWayland)",
         options: ["x11", "wayland"]
