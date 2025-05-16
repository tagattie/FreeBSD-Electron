--- src/main/menus/app.ts.orig	2025-05-16 07:06:36 UTC
+++ src/main/menus/app.ts
@@ -249,7 +249,7 @@ export function createTemplate(config: Config, updateM
         },
     }];
 
-    if (process.platform !== 'linux') {
+    if (process.platform !== 'linux' && process.platform !== 'freebsd') {
         viewSubMenu.push({
             role: 'togglefullscreen',
             label: localizeMessage('main.menus.app.view.fullscreen', 'Toggle Full Screen'),
