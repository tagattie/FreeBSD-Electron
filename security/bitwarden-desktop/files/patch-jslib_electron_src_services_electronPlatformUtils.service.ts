--- jslib/electron/src/services/electronPlatformUtils.service.ts.orig	2021-11-25 07:29:49 UTC
+++ jslib/electron/src/services/electronPlatformUtils.service.ts
@@ -40,7 +40,7 @@ export class ElectronPlatformUtilsService implements P
                 case 'darwin':
                     this.deviceCache = DeviceType.MacOsDesktop;
                     break;
-                case 'linux':
+                case 'linux': case 'freebsd':
                 default:
                     this.deviceCache = DeviceType.LinuxDesktop;
                     break;
