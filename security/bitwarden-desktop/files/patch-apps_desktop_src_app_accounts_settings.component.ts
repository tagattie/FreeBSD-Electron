--- apps/desktop/src/app/accounts/settings.component.ts.orig	2023-08-24 18:31:12 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -600,7 +600,7 @@ export class SettingsComponent implements OnInit {
 
       this.form.controls.enableBrowserIntegration.setValue(false);
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform == "freebsd") {
       await this.dialogService.openSimpleDialog({
         title: { key: "browserIntegrationUnsupportedTitle" },
         content: { key: "browserIntegrationLinuxDesc" },
