--- src/main/cli.ts.orig	2026-11-19 18:38:38 UTC
+++ src/main/cli.ts
@@ -69,7 +69,7 @@ const extraOptions = {
         argumentName: "feature1,feature2,…"
     },
     "ozone-platform": {
-        hidden: process.platform !== "linux",
+        hidden: process.platform !== "linux" && process.platform !== "freebsd",
         type: "string",
         description: "Whether to run Vesktop in Wayland or X11 (XWayland)",
         options: ["x11", "wayland"]
