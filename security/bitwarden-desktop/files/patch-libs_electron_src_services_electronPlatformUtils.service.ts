--- libs/electron/src/services/electronPlatformUtils.service.ts.orig	2022-08-11 18:59:38 UTC
+++ libs/electron/src/services/electronPlatformUtils.service.ts
@@ -28,7 +28,7 @@ export class ElectronPlatformUtilsService implements P
         case "darwin":
           this.deviceCache = DeviceType.MacOsDesktop;
           break;
-        case "linux":
+        case "linux": case "freebsd":
         default:
           this.deviceCache = DeviceType.LinuxDesktop;
           break;
