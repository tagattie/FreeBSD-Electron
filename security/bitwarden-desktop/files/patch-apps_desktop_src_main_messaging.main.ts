--- apps/desktop/src/main/messaging.main.ts.orig	2025-04-28 18:52:32 UTC
+++ apps/desktop/src/main/messaging.main.ts
@@ -23,7 +23,7 @@ export class MessagingMain {
 
   async init() {
     this.scheduleNextSync();
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       await this.desktopSettingsService.setOpenAtLogin(fs.existsSync(this.linuxStartupFile()));
     } else {
       const loginSettings = app.getLoginItemSettings();
@@ -121,13 +121,13 @@ export class MessagingMain {
   }
 
   private addOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       const data = `[Desktop Entry]
 Type=Application
 Version=${app.getVersion()}
 Name=Bitwarden
 Comment=Bitwarden startup script
-Exec=${app.getPath("exe")}
+Exec=bitwarden-desktop
 StartupNotify=false
 Terminal=false`;
 
@@ -142,7 +142,7 @@ Terminal=false`;
   }
 
   private removeOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (fs.existsSync(this.linuxStartupFile())) {
         fs.unlinkSync(this.linuxStartupFile());
       }
