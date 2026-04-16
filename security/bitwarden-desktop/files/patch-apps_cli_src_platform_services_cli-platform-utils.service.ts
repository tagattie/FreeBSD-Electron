--- apps/cli/src/platform/services/cli-platform-utils.service.ts.orig	2026-03-27 19:20:46 UTC
+++ apps/cli/src/platform/services/cli-platform-utils.service.ts
@@ -88,7 +88,7 @@ export class CliPlatformUtilsService implements Platfo
   }
 
   launchUri(uri: string, options?: any): void {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
       child_process.spawnSync("xdg-open", [uri]);
     } else {
       // eslint-disable-next-line no-console
