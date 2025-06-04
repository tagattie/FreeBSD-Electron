--- src/electron-main.ts.orig	2025-06-03 15:13:27 UTC
+++ src/electron-main.ts
@@ -304,7 +304,7 @@ if (!app.commandLine.hasSwitch("enable-features")) {
 }
 // Workaround bug in electron 36:https://github.com/electron/electron/issues/46538
 // Hopefully this will no longer be needed soon and can be removed
-if (process.platform === "linux") {
+if (process.platform === "linux" || process.platform === "freebsd") {
     app.commandLine.appendSwitch("gtk-version", "3");
 }
 
