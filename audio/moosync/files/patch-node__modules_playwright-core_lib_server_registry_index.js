--- node_modules/playwright-core/lib/server/registry/index.js.orig	2024-02-18 10:42:19 UTC
+++ node_modules/playwright-core/lib/server/registry/index.js
@@ -299,7 +299,7 @@ const registryDirectory = exports.registryDirectory = 
     result = envDefined;
   } else {
     let cacheDirectory;
-    if (process.platform === 'linux') cacheDirectory = process.env.XDG_CACHE_HOME || _path.default.join(os.homedir(), '.cache');else if (process.platform === 'darwin') cacheDirectory = _path.default.join(os.homedir(), 'Library', 'Caches');else if (process.platform === 'win32') cacheDirectory = process.env.LOCALAPPDATA || _path.default.join(os.homedir(), 'AppData', 'Local');else throw new Error('Unsupported platform: ' + process.platform);
+    if (process.platform === 'linux' || process.platform === 'freebsd') cacheDirectory = process.env.XDG_CACHE_HOME || _path.default.join(os.homedir(), '.cache');else if (process.platform === 'darwin') cacheDirectory = _path.default.join(os.homedir(), 'Library', 'Caches');else if (process.platform === 'win32') cacheDirectory = process.env.LOCALAPPDATA || _path.default.join(os.homedir(), 'AppData', 'Local');else throw new Error('Unsupported platform: ' + process.platform);
     result = _path.default.join(cacheDirectory, 'ms-playwright');
   }
   if (!_path.default.isAbsolute(result)) {
