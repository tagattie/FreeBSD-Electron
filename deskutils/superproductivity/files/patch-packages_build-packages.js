--- packages/build-packages.js.orig	2026-10-11 07:51:03 UTC
+++ packages/build-packages.js
@@ -218,7 +218,7 @@ async function buildPlugin(plugin) {
         }
         if (needsInstall) {
           log(`  Installing dependencies...`, colors.yellow);
-          await execAsync(`cd ${pluginPath} && npm install`);
+          await execAsync(`cd ${pluginPath} && npm install --offline`);
         }
       } catch {
         // No package.json, skip install
