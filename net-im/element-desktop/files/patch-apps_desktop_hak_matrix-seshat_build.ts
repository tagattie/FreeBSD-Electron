--- apps/desktop/hak/matrix-seshat/build.ts.orig	2026-05-27 13:46:37 UTC
+++ apps/desktop/hak/matrix-seshat/build.ts
@@ -17,7 +17,7 @@ export default async function (hakEnv: HakEnv, moduleI
     }
 
     console.log("Running yarn install");
-    await hakEnv.spawn("yarn", ["install"], {
+    await hakEnv.spawn("yarn", ["install", "--offline", "--frozen-lockfile", `--yarnrc=${moduleInfo.moduleBuildDir}/.yarnrc`], {
         cwd: moduleInfo.moduleBuildDir,
         env,
         shell: true,
