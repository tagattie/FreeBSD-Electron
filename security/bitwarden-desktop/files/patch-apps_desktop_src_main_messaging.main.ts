--- apps/desktop/src/main/messaging.main.ts.orig	2022-07-06 07:41:49 UTC
+++ apps/desktop/src/main/messaging.main.ts
@@ -18,7 +18,7 @@ export class MessagingMain {
 
   init() {
     this.scheduleNextSync();
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       this.stateService.setOpenAtLogin(fs.existsSync(this.linuxStartupFile()));
     } else {
       const loginSettings = app.getLoginItemSettings();
@@ -110,13 +110,13 @@ export class MessagingMain {
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
 
@@ -131,7 +131,7 @@ Terminal=false`;
   }
 
   private removeOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (fs.existsSync(this.linuxStartupFile())) {
         fs.unlinkSync(this.linuxStartupFile());
       }
