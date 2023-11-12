--- apps/desktop/src/app/accounts/settings.component.ts.orig	2023-11-06 18:50:48 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -599,7 +599,7 @@ export class SettingsComponent implements OnInit {
 
       this.form.controls.enableBrowserIntegration.setValue(false);
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform == "freebsd") {
       await this.dialogService.openSimpleDialog({
         title: { key: "browserIntegrationUnsupportedTitle" },
         content: { key: "browserIntegrationLinuxDesc" },
