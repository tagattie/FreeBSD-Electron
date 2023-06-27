--- webpack.config.base.js.orig	2023-06-19 18:19:05 UTC
+++ webpack.config.base.js
@@ -11,7 +11,7 @@ const path = require('path');
 
 const webpack = require('webpack');
 
-const VERSION = childProcess.execSync('git rev-parse --short HEAD').toString();
+const VERSION = '420c63d'; // childProcess.execSync('git rev-parse --short HEAD').toString();
 const isProduction = process.env.NODE_ENV === 'production';
 const isTest = process.env.NODE_ENV === 'test';
 const isRelease = process.env.CIRCLE_BRANCH && process.env.CIRCLE_BRANCH.startsWith('release-');
