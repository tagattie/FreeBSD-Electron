--- apps/desktop/src/key-management/biometrics/main-biometrics.service.ts.orig	2026-07-15 09:46:59 UTC
+++ apps/desktop/src/key-management/biometrics/main-biometrics.service.ts
@@ -33,7 +33,7 @@ export class MainBiometricsService extends DesktopBiom
       // eslint-disable-next-line
       const OsBiometricsServiceMac = require("./os-biometrics-mac.service").default;
       this.osBiometricsService = new OsBiometricsServiceMac(this.i18nService, this.logService);
-    } else if (platform === "linux") {
+    } else if (platform === "linux" || platform === "freebsd") {
       this.osBiometricsService = new LinuxBiometricsSystem();
     } else {
       throw new Error("Unsupported platform");
