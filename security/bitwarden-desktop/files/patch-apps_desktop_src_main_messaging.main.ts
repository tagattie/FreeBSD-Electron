--- apps/desktop/src/main/messaging.main.ts.orig	2024-03-06 20:31:11 UTC
+++ apps/desktop/src/main/messaging.main.ts
@@ -21,7 +21,7 @@ export class MessagingMain {
 
   init() {
     this.scheduleNextSync();
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
       // eslint-disable-next-line @typescript-eslint/no-floating-promises
       this.stateService.setOpenAtLogin(fs.existsSync(this.linuxStartupFile()));
@@ -135,13 +135,13 @@ export class MessagingMain {
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
 
@@ -156,7 +156,7 @@ Terminal=false`;
   }
 
   private removeOpenAtLogin() {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       if (fs.existsSync(this.linuxStartupFile())) {
         fs.unlinkSync(this.linuxStartupFile());
       }
