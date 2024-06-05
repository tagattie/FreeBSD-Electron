--- webpack.config.base.js.orig	2024-05-16 20:45:52 UTC
+++ webpack.config.base.js
@@ -7,7 +7,8 @@ const webpack = require('webpack');
 
 const webpack = require('webpack');
 
-const VERSION = childProcess.execSync('git rev-parse --short HEAD', {cwd: __dirname}).toString();
+// const VERSION = childProcess.execSync('git rev-parse --short HEAD', {cwd: __dirname}).toString();
+const VERSION = '8834720c';
 const isProduction = process.env.NODE_ENV === 'production';
 const isTest = process.env.NODE_ENV === 'test';
 const isRelease = process.env.GITHUB_WORKFLOW && process.env.GITHUB_WORKFLOW.startsWith('release');
