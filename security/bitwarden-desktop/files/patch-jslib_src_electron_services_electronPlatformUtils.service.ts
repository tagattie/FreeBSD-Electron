--- jslib/src/electron/services/electronPlatformUtils.service.ts.orig	2021-03-21 08:27:21 UTC
+++ jslib/src/electron/services/electronPlatformUtils.service.ts
@@ -41,7 +41,7 @@ export class ElectronPlatformUtilsService implements P
                 case 'darwin':
                     this.deviceCache = DeviceType.MacOsDesktop;
                     break;
-                case 'linux':
+                case 'linux': case 'freebsd':
                 default:
                     this.deviceCache = DeviceType.LinuxDesktop;
                     break;
