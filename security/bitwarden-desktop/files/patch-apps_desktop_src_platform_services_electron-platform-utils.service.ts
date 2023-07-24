--- apps/desktop/src/platform/services/electron-platform-utils.service.ts.orig	2023-07-24 08:43:05 UTC
+++ apps/desktop/src/platform/services/electron-platform-utils.service.ts
@@ -28,7 +28,7 @@ export class ElectronPlatformUtilsService implements P
         case "darwin":
           this.deviceCache = DeviceType.MacOsDesktop;
           break;
-        case "linux":
+        case "linux": case "freebsd":
         default:
           this.deviceCache = DeviceType.LinuxDesktop;
           break;
