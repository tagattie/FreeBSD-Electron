--- node_modules/auto-launch/dist/index.js.orig	2023-03-21 07:27:53 UTC
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
