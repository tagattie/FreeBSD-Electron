--- apps/desktop/src/key-management/biometrics/main-biometrics.service.ts.orig	2026-09-07 14:06:16 UTC
+++ apps/desktop/src/key-management/biometrics/main-biometrics.service.ts
@@ -46,7 +46,7 @@ export class MainBiometricsService extends DesktopBiom
       // eslint-disable-next-line
       const OsBiometricsServiceMac = require("./os-biometrics-mac.service").default;
       this.osBiometricsService = new OsBiometricsServiceMac(this.i18nService, this.logService);
-    } else if (platform === "linux") {
+    } else if (platform === "linux" || platform === "freebsd") {
       this.osBiometricsService = new LinuxBiometricsSystem();
     } else {
       throw new Error("Unsupported platform");
