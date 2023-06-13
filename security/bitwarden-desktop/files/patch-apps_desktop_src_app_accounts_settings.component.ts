--- apps/desktop/src/app/accounts/settings.component.ts.orig	2023-05-31 00:42:10 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -543,7 +543,7 @@ export class SettingsComponent implements OnInit {
 
       this.form.controls.enableBrowserIntegration.setValue(false);
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform == "freebsd") {
       await this.dialogService.openSimpleDialog({
         title: { key: "browserIntegrationUnsupportedTitle" },
         content: { key: "browserIntegrationLinuxDesc" },
