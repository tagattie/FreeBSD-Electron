--- test/modules/environment.js.orig	2021-12-31 10:11:02 UTC
+++ test/modules/environment.js
@@ -62,7 +62,7 @@ module.exports = {
         if (process.env.MM_DEBUG_SETTINGS) {
             options.chromeDriverLogPath = './chromedriverlog.txt';
         }
-        if (process.platform === 'darwin' || process.platform === 'linux') {
+        if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
             // on a mac, debbuging port might conflict with other apps
             // this changes the default debugging port so chromedriver can run without issues.
             options.chromeDriverArgs.push('remote-debugging-port=9222');
