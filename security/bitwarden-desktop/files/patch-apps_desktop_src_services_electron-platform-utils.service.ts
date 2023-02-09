--- apps/desktop/src/services/electron-platform-utils.service.ts.orig	2023-02-08 12:03:42 UTC
+++ apps/desktop/src/services/electron-platform-utils.service.ts
@@ -28,7 +28,7 @@ export class ElectronPlatformUtilsService implements P
         case "darwin":
           this.deviceCache = DeviceType.MacOsDesktop;
           break;
-        case "linux":
+        case "linux": case "freebsd":
         default:
           this.deviceCache = DeviceType.LinuxDesktop;
           break;
