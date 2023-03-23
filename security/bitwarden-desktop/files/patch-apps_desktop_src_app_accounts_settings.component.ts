--- apps/desktop/src/app/accounts/settings.component.ts.orig	2023-03-22 14:48:32 UTC
+++ apps/desktop/src/app/accounts/settings.component.ts
@@ -418,7 +418,7 @@ export class SettingsComponent implements OnInit {
 
       this.enableBrowserIntegration = false;
       return;
-    } else if (process.platform == "linux") {
+    } else if (process.platform == "linux" || process.platform === "freebsd") {
       await this.platformUtilsService.showDialog(
         this.i18nService.t("browserIntegrationLinuxDesc"),
         this.i18nService.t("browserIntegrationUnsupportedTitle"),
