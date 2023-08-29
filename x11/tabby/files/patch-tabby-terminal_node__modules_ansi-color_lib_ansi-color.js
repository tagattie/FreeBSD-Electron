--- tabby-terminal/node_modules/ansi-color/lib/ansi-color.js.orig	2023-08-29 10:56:12 UTC
+++ tabby-terminal/node_modules/ansi-color/lib/ansi-color.js
@@ -32,8 +32,8 @@ exports.set = function(str, color) {
   var color_attrs = color.split("+");
   var ansi_str = "";
   for(var i=0, attr; attr = color_attrs[i]; i++) {
-    ansi_str += "\033[" + ANSI_CODES[attr] + "m";
+    ansi_str += "\x1b[" + ANSI_CODES[attr] + "m";
   }
-  ansi_str += str + "\033[" + ANSI_CODES["off"] + "m";
+  ansi_str += str + "\x1b[" + ANSI_CODES["off"] + "m";
   return ansi_str;
-};
\ No newline at end of file
+};
