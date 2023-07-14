--- node_modules/playwright-core/lib/server/registry/index.js.orig	2023-07-12 11:11:52 UTC
+++ node_modules/playwright-core/lib/server/registry/index.js
@@ -241,7 +241,7 @@ const registryDirectory = (() => {
     result = envDefined;
   } else {
     let cacheDirectory;
-    if (process.platform === 'linux') cacheDirectory = process.env.XDG_CACHE_HOME || _path.default.join(os.homedir(), '.cache');else if (process.platform === 'darwin') cacheDirectory = _path.default.join(os.homedir(), 'Library', 'Caches');else if (process.platform === 'win32') cacheDirectory = process.env.LOCALAPPDATA || _path.default.join(os.homedir(), 'AppData', 'Local');else throw new Error('Unsupported platform: ' + process.platform);
+    if (process.platform === 'linux' || process.platform === 'freebsd') cacheDirectory = process.env.XDG_CACHE_HOME || _path.default.join(os.homedir(), '.cache');else if (process.platform === 'darwin') cacheDirectory = _path.default.join(os.homedir(), 'Library', 'Caches');else if (process.platform === 'win32') cacheDirectory = process.env.LOCALAPPDATA || _path.default.join(os.homedir(), 'AppData', 'Local');else throw new Error('Unsupported platform: ' + process.platform);
     result = _path.default.join(cacheDirectory, 'ms-playwright');
   }
   if (!_path.default.isAbsolute(result)) {
@@ -816,4 +816,4 @@ function lowercaseAllKeys(json) {
   return result;
 }
 const registry = new Registry(require('../../../browsers.json'));
-exports.registry = registry;
\ No newline at end of file
+exports.registry = registry;
