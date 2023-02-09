--- apps/desktop/src/app/accounts/settings.component.ts.orig	2023-01-13 13:24:09 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -416,7 +416,7 @@ export class SettingsComponent implements OnInit {
 
       this.enableBrowserIntegration = false;
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform === "freebsd") {
       await this.platformUtilsService.showDialog(
         this.i18nService.t("browserIntegrationLinuxDesc"),
         this.i18nService.t("browserIntegrationUnsupportedTitle"),
