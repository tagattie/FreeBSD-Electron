--- rollup.config.mjs.orig	2024-01-31 12:23:37 UTC
+++ rollup.config.mjs
@@ -10,7 +10,7 @@ import copy from 'rollup-plugin-copy';
 import electron from 'electron';
 import copy from 'rollup-plugin-copy';
 
-import appManifest from './package.json' with { type: 'json' };
+import appManifest from './package.json' assert { type: 'json' };
 
 const NODE_ENV = process.env.NODE_ENV || 'development';
 const canRun =
