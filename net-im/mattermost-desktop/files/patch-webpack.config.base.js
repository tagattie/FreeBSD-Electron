--- webpack.config.base.js.orig	2022-01-07 06:47:01 UTC
+++ webpack.config.base.js
@@ -12,7 +12,7 @@ const webpack = require('webpack');
 
 const path = require('path');
 
-const VERSION = childProcess.execSync('git rev-parse --short HEAD').toString();
+const VERSION = 'e3d9902'; // childProcess.execSync('git rev-parse --short HEAD').toString();
 const isProduction = process.env.NODE_ENV === 'production';
 const isRelease = process.env.CIRCLE_BRANCH && process.env.CIRCLE_BRANCH.startsWith('release-');
 
