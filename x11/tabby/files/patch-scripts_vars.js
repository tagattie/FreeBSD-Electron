--- scripts/vars.js.orig	2023-02-20 10:40:49 UTC
+++ scripts/vars.js
@@ -5,7 +5,7 @@ const childProcess = require('child_process')
 
 const electronInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../node_modules/electron/package.json')))
 
-exports.version = childProcess.execSync('git describe --tags', { encoding:'utf-8' })
+exports.version = 'v1.0.189' // childProcess.execSync('git describe --tags', { encoding:'utf-8' })
 exports.version = exports.version.substring(1).trim()
 exports.version = exports.version.replace('-', '-c')
 
@@ -63,6 +63,12 @@ exports.keygenConfig = {
         }[process.env.ARCH ?? process.arch],
         linux: {
             x64: '7bf45071-3031-4a26-9f2e-72604308313e',
+            arm64: '39e3c736-d4d4-4fbf-a201-324b7bab0d17',
+            armv7l: '50ae0a82-7f47-4fa4-b0a8-b0d575ce9409',
+            armhf: '7df5aa12-04ab-4075-a0fe-93b0bbea9643',
+        }[process.env.ARCH ?? process.arch],
+        freebsd: {
+            amd64: '7bf45071-3031-4a26-9f2e-72604308313e',
             arm64: '39e3c736-d4d4-4fbf-a201-324b7bab0d17',
             armv7l: '50ae0a82-7f47-4fa4-b0a8-b0d575ce9409',
             armhf: '7df5aa12-04ab-4075-a0fe-93b0bbea9643',
