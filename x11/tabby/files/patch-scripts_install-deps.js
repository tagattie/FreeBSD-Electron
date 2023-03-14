--- scripts/install-deps.js.orig	2023-03-14 11:46:18 UTC
+++ scripts/install-deps.js
@@ -9,18 +9,18 @@ sh.exec(`yarn patch-package`, { fatal: true })
 log.info('deps', 'app')
 
 sh.cd('app')
-sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
+sh.exec(`yarn install --force --frozen-lockfile --offline`, { fatal: true })
 sh.cd('..')
 
 sh.cd('web')
-sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
+sh.exec(`yarn install --force --frozen-lockfile --offline`, { fatal: true })
 sh.exec(`yarn patch-package`, { fatal: true })
 sh.cd('..')
 
 vars.allPackages.forEach(plugin => {
     log.info('deps', plugin)
     sh.cd(plugin)
-    sh.exec(`yarn install --force --network-timeout 1000000`, { fatal: true })
+    sh.exec(`yarn install --force --frozen-lockfile --offline`, { fatal: true })
     sh.cd('..')
 })
 
