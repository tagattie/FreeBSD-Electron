--- apps/desktop/src/main/messaging.main.ts.orig	2026-07-15 09:46:59 UTC
+++ apps/desktop/src/main/messaging.main.ts
@@ -116,10 +116,10 @@ export class MessagingMain {
   // management) is handled by the Rust native module; here we only gather the values Electron
   // knows and delegate. macOS/Windows use Electron's login-item API, which has no Rust equivalent.
   private setOpenAtLogin(enabled: boolean) {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       autostart
         .setAutostart(enabled, {
-          execPath: app.getPath("exe"),
+          execPath: "bitwarden-desktop",
           autostartFlag: AUTOSTART_FLAG,
         })
         .catch((e) => {
