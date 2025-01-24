--- apps/cli/src/platform/services/cli-platform-utils.service.ts.orig	2025-01-23 11:12:57 UTC
+++ apps/cli/src/platform/services/cli-platform-utils.service.ts
@@ -81,7 +81,7 @@ export class CliPlatformUtilsService implements Platfo
   }
 
   launchUri(uri: string, options?: any): void {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       child_process.spawnSync("xdg-open", [uri]);
     } else {
       open(uri);
