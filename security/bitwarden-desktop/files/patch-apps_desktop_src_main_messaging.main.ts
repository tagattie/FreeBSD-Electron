--- apps/desktop/src/main/messaging.main.ts.orig	2026-06-25 01:41:32 UTC
+++ apps/desktop/src/main/messaging.main.ts
@@ -129,7 +129,7 @@ export class MessagingMain {
   }
 
   private addOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (isFlatpak()) {
         autostart.setAutostart(true, ["bitwarden.sh", AUTOSTART_FLAG, "%U"]).catch((e) => {});
       } else if (isSnapStore()) {
@@ -140,7 +140,7 @@ export class MessagingMain {
   Version=${app.getVersion()}
   Name=Bitwarden
   Comment=Bitwarden startup script
-  Exec=${app.getPath("exe")} ${AUTOSTART_FLAG}
+  Exec=bitwarden-desktop ${AUTOSTART_FLAG}
   StartupNotify=false
   Terminal=false`;
 
@@ -201,7 +201,7 @@ export class MessagingMain {
   }
 
   private removeOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (isFlatpak()) {
         autostart.setAutostart(false, []).catch((e) => {});
       } else {
