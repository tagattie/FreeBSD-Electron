--- webpack.config.base.js.orig	2023-12-15 14:26:44 UTC
+++ webpack.config.base.js
@@ -11,7 +11,7 @@ const webpack = require('webpack');
 
 const webpack = require('webpack');
 
-const VERSION = childProcess.execSync('git rev-parse --short HEAD').toString();
+const VERSION = 'aebafea9'; // childProcess.execSync('git rev-parse --short HEAD').toString();
 const isProduction = process.env.NODE_ENV === 'production';
 const isTest = process.env.NODE_ENV === 'test';
 const isRelease = process.env.CIRCLE_BRANCH && process.env.CIRCLE_BRANCH.startsWith('release-');
