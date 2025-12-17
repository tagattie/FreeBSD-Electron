--- apps/desktop/src/key-management/biometrics/main-biometrics.service.ts.orig	2025-12-11 21:15:41 UTC
+++ apps/desktop/src/key-management/biometrics/main-biometrics.service.ts
@@ -38,7 +38,7 @@ export class MainBiometricsService extends DesktopBiom
       // eslint-disable-next-line
       const OsBiometricsServiceMac = require("./os-biometrics-mac.service").default;
       this.osBiometricsService = new OsBiometricsServiceMac(this.i18nService, this.logService);
-    } else if (platform === "linux") {
+    } else if (platform === "linux" || platform === "freebsd") {
       // eslint-disable-next-line
       const OsBiometricsServiceLinux = require("./os-biometrics-linux.service").default;
       this.osBiometricsService = new OsBiometricsServiceLinux(
