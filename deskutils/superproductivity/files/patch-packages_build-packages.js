--- packages/build-packages.js.orig	2026-07-17 13:08:30 UTC
+++ packages/build-packages.js
@@ -213,7 +213,7 @@ async function buildPlugin(plugin) {
         }
         if (needsInstall) {
           log(`  Installing dependencies...`, colors.yellow);
-          await execAsync(`cd ${pluginPath} && npm install`);
+          await execAsync(`cd ${pluginPath} && npm install --offline`);
         }
       } catch {
         // No package.json, skip install
