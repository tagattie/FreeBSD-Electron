--- scripts/prepackage-plugins.js.orig	2023-03-14 11:47:36 UTC
+++ scripts/prepackage-plugins.js
@@ -18,7 +18,7 @@ vars.builtinPlugins.forEach(plugin => {
     sh.cp('-r', path.join('..', plugin), '.')
     sh.rm('-rf', path.join(plugin, 'node_modules'))
     sh.cd(plugin)
-    sh.exec(`yarn install --force --production`, { fatal: true })
+    sh.exec(`yarn install --force --frozen-lockfile --offline --production`, { fatal: true })
 
 
     log.info('rebuild', 'native')
