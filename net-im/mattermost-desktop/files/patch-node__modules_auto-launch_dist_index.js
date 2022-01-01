--- node_modules/auto-launch/dist/index.js.orig	2021-12-31 10:19:37 UTC
+++ node_modules/auto-launch/dist/index.js
@@ -38,7 +38,7 @@ module.exports = AutoLaunch = (function() {
       this.api = require('./AutoLaunchWindows');
     } else if (/darwin/.test(process.platform)) {
       this.api = require('./AutoLaunchMac');
-    } else if (/linux/.test(process.platform)) {
+    } else if (/(linux|freebsd)/.test(process.platform)) {
       this.api = require('./AutoLaunchLinux');
     } else {
       throw new Error('Unsupported platform');
