--- node_modules/app-builder-lib/out/node-module-collector/nodeModulesCollector.js.orig	1971-12-10 00:00:00 UTC
+++ node_modules/app-builder-lib/out/node-module-collector/nodeModulesCollector.js
@@ -26,6 +26,9 @@ class NodeModulesCollector {
     async getDependenciesTree() {
         const command = await this.pmCommand.value;
         const args = this.getArgs();
+        // "dependency path is undefined" errors after upgrade to electron-builder 26
+        // https://github.com/electron-userland/electron-builder/issues/9011#issuecomment-2779729504
+        args.push("--prefix", "../");
         const dependencies = await (0, builder_util_1.exec)(command, args, {
             cwd: this.rootDir,
             shell: true,
@@ -174,4 +177,4 @@ exports.NodeModulesCollector = NodeModulesCollector;
     }
 }
 exports.NodeModulesCollector = NodeModulesCollector;
-//# sourceMappingURL=nodeModulesCollector.js.map
\ No newline at end of file
+//# sourceMappingURL=nodeModulesCollector.js.map
