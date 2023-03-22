--- scripts/install-deps.mjs.orig	2023-03-22 08:09:41 UTC
+++ scripts/install-deps.mjs
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
 
