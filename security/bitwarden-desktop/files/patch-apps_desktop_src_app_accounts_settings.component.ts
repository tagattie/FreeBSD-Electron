--- apps/desktop/src/app/accounts/settings.component.ts.orig	2022-08-11 18:59:38 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -410,7 +410,7 @@ export class SettingsComponent implements OnInit {
 
       this.enableBrowserIntegration = false;
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform === "freebsd") {
       await this.platformUtilsService.showDialog(
         this.i18nService.t("browserIntegrationLinuxDesc"),
         this.i18nService.t("browserIntegrationUnsupportedTitle"),
