--- jslib/electron/src/services/electronPlatformUtils.service.ts.orig	2022-02-11 20:26:02 UTC
+++ jslib/electron/src/services/electronPlatformUtils.service.ts
@@ -33,7 +33,7 @@ export class ElectronPlatformUtilsService implements P
         case "darwin":
           this.deviceCache = DeviceType.MacOsDesktop;
           break;
-        case "linux":
+        case "linux": case "freebsd":
         default:
           this.deviceCache = DeviceType.LinuxDesktop;
           break;
