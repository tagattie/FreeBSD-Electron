--- src/main/messaging.main.ts.orig	2021-03-21 08:24:22 UTC
+++ src/main/messaging.main.ts
@@ -17,7 +17,7 @@ export class MessagingMain {
 
     init() {
         this.scheduleNextSync();
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.storageService.save(ElectronConstants.openAtLogin, fs.existsSync(this.linuxStartupFile()));
         } else {
             const loginSettings = app.getLoginItemSettings();
@@ -101,7 +101,7 @@ export class MessagingMain {
     }
 
     private addOpenAtLogin() {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const data = `[Desktop Entry]
 Type=Application
 Version=${app.getVersion()}
@@ -122,7 +122,7 @@ Terminal=false`;
     }
 
     private removeOpenAtLogin() {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             if (fs.existsSync(this.linuxStartupFile())) {
                 fs.unlinkSync(this.linuxStartupFile());
             }
