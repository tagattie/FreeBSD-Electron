--- scripts/vars.mjs.orig	2024-07-18 22:16:58 UTC
+++ scripts/vars.mjs
@@ -10,7 +10,8 @@ const electronInfo = JSON.parse(fs.readFileSync(path.r
 
 const electronInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../node_modules/electron/package.json')))
 
-export let version = childProcess.execSync('git describe --tags', { encoding:'utf-8' })
+// export let version = childProcess.execSync('git describe --tags', { encoding:'utf-8' })
+export let version = '%%DISTVERSIONFULL%%'
 version = version.substring(1).trim()
 version = version.replace('-', '-c')
 
@@ -68,6 +69,12 @@ export const keygenConfig = {
         }[process.env.ARCH],
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
