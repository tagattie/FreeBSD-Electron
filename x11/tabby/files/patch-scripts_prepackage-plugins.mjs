--- scripts/prepackage-plugins.mjs.orig	2023-03-22 08:10:48 UTC
+++ scripts/prepackage-plugins.mjs
@@ -22,7 +22,7 @@ vars.builtinPlugins.forEach(plugin => {
     sh.cp('-r', path.join('..', plugin), '.')
     sh.rm('-rf', path.join(plugin, 'node_modules'))
     sh.cd(plugin)
-    sh.exec(`yarn install --force --production`, { fatal: true })
+    sh.exec(`yarn install --force --production --frozen-lockfile --offline`, { fatal: true })
 
 
     log.info('rebuild', 'native')
