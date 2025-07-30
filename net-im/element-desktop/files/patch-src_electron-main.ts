--- src/electron-main.ts.orig	2025-07-29 13:25:01 UTC
+++ src/electron-main.ts
@@ -305,7 +305,7 @@ if (!app.commandLine.hasSwitch("enable-features")) {
 }
 // Workaround bug in electron 36:https://github.com/electron/electron/issues/46538
 // Hopefully this will no longer be needed soon and can be removed
-if (process.platform === "linux") {
+if (process.platform === "linux" || process.platform === "freebsd") {
     app.commandLine.appendSwitch("gtk-version", "3");
 }
 
