--- scripts/install-deps.mjs.orig	2025-01-09 20:06:01 UTC
+++ scripts/install-deps.mjs
@@ -9,24 +9,24 @@ sh.cd('app')
 log.info('deps', 'app')
 
 sh.cd('app')
-sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
+// sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
 // Some native packages might fail to build before patch-package gets a chance to run via postinstall
 sh.exec(`yarn postinstall`, { fatal: false })
 sh.cd('..')
 
 sh.cd('web')
-sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
+// sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
 sh.exec(`yarn patch-package`, { fatal: true })
 sh.cd('..')
 
-vars.allPackages.forEach(plugin => {
-    log.info('deps', plugin)
-    sh.cd(plugin)
-    sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
-    sh.cd('..')
-})
+// vars.allPackages.forEach(plugin => {
+//     log.info('deps', plugin)
+//     sh.cd(plugin)
+//     sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
+//     sh.cd('..')
+// })
 
-if (['darwin', 'linux'].includes(process.platform)) {
+if (['darwin', 'linux', 'freebsd'].includes(process.platform)) {
     sh.cd('node_modules')
     for (let x of vars.builtinPlugins) {
         sh.ln('-fs', '../' + x, x)
