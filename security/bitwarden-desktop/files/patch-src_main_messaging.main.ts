--- src/main/messaging.main.ts.orig	2021-12-08 14:59:04 UTC
+++ src/main/messaging.main.ts
@@ -17,7 +17,7 @@ export class MessagingMain {
 
     init() {
         this.scheduleNextSync();
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.storageService.save(ElectronConstants.openAtLogin, fs.existsSync(this.linuxStartupFile()));
         } else {
             const loginSettings = app.getLoginItemSettings();
@@ -105,13 +105,13 @@ export class MessagingMain {
     }
 
     private addOpenAtLogin() {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const data = `[Desktop Entry]
 Type=Application
 Version=${app.getVersion()}
 Name=Bitwarden
 Comment=Bitwarden startup script
-Exec=${app.getPath('exe')}
+Exec=bitwarden-desktop
 StartupNotify=false
 Terminal=false`;
 
@@ -126,7 +126,7 @@ Terminal=false`;
     }
 
     private removeOpenAtLogin() {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             if (fs.existsSync(this.linuxStartupFile())) {
                 fs.unlinkSync(this.linuxStartupFile());
             }
