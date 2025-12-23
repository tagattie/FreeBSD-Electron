--- emain/emain-window.ts.orig	2025-12-22 08:38:08 UTC
+++ emain/emain-window.ts
@@ -173,7 +173,7 @@ export class WaveBrowserWindow extends BaseWindow {
             } else {
                 winOpts.backgroundColor = "#222222";
             }
-        } else if (opts.unamePlatform === "linux") {
+        } else if (opts.unamePlatform === "linux" || opts.unamePlatform === "freebsd") {
             winOpts.titleBarStyle = settings["window:nativetitlebar"] ? "default" : "hidden";
             winOpts.titleBarOverlay = {
                 symbolColor: "white",
