--- apps/desktop/src/app/accounts/settings.component.ts.orig	2022-07-06 07:40:59 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -386,7 +386,7 @@ export class SettingsComponent implements OnInit {
 
       this.enableBrowserIntegration = false;
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform === "freebsd") {
       await this.platformUtilsService.showDialog(
         this.i18nService.t("browserIntegrationLinuxDesc"),
         this.i18nService.t("browserIntegrationUnsupportedTitle"),
