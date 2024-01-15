--- apps/desktop/src/app/accounts/settings.component.ts.orig	2024-01-09 15:12:51 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -602,7 +602,7 @@ export class SettingsComponent implements OnInit {
 
       this.form.controls.enableBrowserIntegration.setValue(false);
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform == "freebsd") {
       await this.dialogService.openSimpleDialog({
         title: { key: "browserIntegrationUnsupportedTitle" },
         content: { key: "browserIntegrationLinuxDesc" },
