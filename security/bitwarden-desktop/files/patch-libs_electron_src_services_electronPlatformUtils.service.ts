--- libs/electron/src/services/electronPlatformUtils.service.ts.orig	2022-07-06 07:51:33 UTC
+++ libs/electron/src/services/electronPlatformUtils.service.ts
@@ -29,7 +29,7 @@ export class ElectronPlatformUtilsService implements P
         case "darwin":
           this.deviceCache = DeviceType.MacOsDesktop;
           break;
-        case "linux":
+        case "linux": case "freebsd":
         default:
           this.deviceCache = DeviceType.LinuxDesktop;
           break;
