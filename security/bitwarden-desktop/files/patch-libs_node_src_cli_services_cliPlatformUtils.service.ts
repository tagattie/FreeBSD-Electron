--- libs/node/src/cli/services/cliPlatformUtils.service.ts.orig	2022-07-06 07:48:28 UTC
+++ libs/node/src/cli/services/cliPlatformUtils.service.ts
@@ -26,7 +26,7 @@ export class CliPlatformUtilsService implements Platfo
         case "darwin":
           this.deviceCache = DeviceType.MacOsDesktop;
           break;
-        case "linux":
+        case "linux": case "freebsd":
         default:
           this.deviceCache = DeviceType.LinuxDesktop;
           break;
@@ -78,7 +78,7 @@ export class CliPlatformUtilsService implements Platfo
   }
 
   launchUri(uri: string, options?: any): void {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       child_process.spawnSync("xdg-open", [uri]);
     } else {
       open(uri);
