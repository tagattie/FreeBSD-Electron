--- bin/yarn-standalone.js.orig	2021-12-30 14:07:33 UTC
+++ bin/yarn-standalone.js
@@ -61199,7 +61199,7 @@ const win = {
 	sevenEighths: '7/8'
 };
 
-if (platform === 'linux') {
+if (platform === 'linux' || platform === 'freebsd') {
 	// the main one doesn't look that good on Ubuntu
 	main.questionMarkPrefix = '?';
 }
@@ -147312,4 +147312,4 @@ module.exports = require("dns");
 module.exports = require("domain");
 
 /***/ })
-/******/ ]);
\ No newline at end of file
+/******/ ]);
