--- apps/desktop/src/main/messaging.main.ts.orig	2025-07-18 15:50:12 UTC
+++ apps/desktop/src/main/messaging.main.ts
@@ -127,7 +127,7 @@ export class MessagingMain {
   }
 
   private addOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (isFlatpak()) {
         autostart.setAutostart(true, []).catch((e) => {});
       } else {
@@ -136,7 +136,7 @@ export class MessagingMain {
   Version=${app.getVersion()}
   Name=Bitwarden
   Comment=Bitwarden startup script
-  Exec=${app.getPath("exe")}
+  Exec=bitwarden-desktop
   StartupNotify=false
   Terminal=false`;
 
@@ -152,7 +152,7 @@ export class MessagingMain {
   }
 
   private removeOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (isFlatpak()) {
         autostart.setAutostart(false, []).catch((e) => {});
       } else {
