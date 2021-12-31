--- node_modules/get-system-fonts/dist/index.js.orig	2020-02-20 10:30:06 UTC
+++ node_modules/get-system-fonts/dist/index.js
@@ -51,6 +51,21 @@ const directories = {
             '/usr/local/share/fonts',
             ...userFolders
         ];
+    },
+    freebsd: () => {
+        const home = os.homedir();
+        const userFolders = home
+            ? [
+                path.join(home, '.fonts'),
+                path.join(home, '.local/share/fonts')
+            ]
+            : [];
+        return [
+            // TODO: use fontconfig to find the folder locations
+            '/usr/share/fonts',
+            '/usr/local/share/fonts',
+            ...userFolders
+        ];
     }
 };
 /**
@@ -70,4 +85,4 @@ function getSystemFonts(options) {
 }
 module.exports = Object.assign(getSystemFonts, { default: getSystemFonts });
 exports.default = getSystemFonts;
-//# sourceMappingURL=index.js.map
\ No newline at end of file
+//# sourceMappingURL=index.js.map
