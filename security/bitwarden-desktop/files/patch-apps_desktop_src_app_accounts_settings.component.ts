--- apps/desktop/src/app/accounts/settings.component.ts.orig	2023-04-26 11:30:57 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -546,7 +546,7 @@ export class SettingsComponent implements OnInit {
 
       this.form.controls.enableBrowserIntegration.setValue(false);
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform === "freebsd") {
       await this.platformUtilsService.showDialog(
         this.i18nService.t("browserIntegrationLinuxDesc"),
         this.i18nService.t("browserIntegrationUnsupportedTitle"),
