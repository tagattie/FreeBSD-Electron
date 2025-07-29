--- apps/cli/src/platform/services/cli-platform-utils.service.ts.orig	2025-07-18 15:50:12 UTC
+++ apps/cli/src/platform/services/cli-platform-utils.service.ts
@@ -80,7 +80,7 @@ export class CliPlatformUtilsService implements Platfo
   }
 
   launchUri(uri: string, options?: any): void {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       child_process.spawnSync("xdg-open", [uri]);
     } else {
       // eslint-disable-next-line no-console
