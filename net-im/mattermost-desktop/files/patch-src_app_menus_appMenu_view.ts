--- src/app/menus/appMenu/view.ts.orig	2025-11-18 22:09:08 UTC
+++ src/app/menus/appMenu/view.ts
@@ -118,7 +118,7 @@ export default function createViewMenu() {
         },
     }];
 
-    if (process.platform !== 'linux') {
+    if (process.platform !== 'linux' && process.platform !== 'freebsd') {
         viewSubMenu.push({
             role: 'togglefullscreen',
             label: localizeMessage('main.menus.app.view.fullscreen', 'Toggle Full Screen'),
@@ -185,7 +185,7 @@ export default function createViewMenu() {
         submenu: devToolsSubMenu,
     });
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         viewSubMenu.push({type: 'separator'});
         viewSubMenu.push({
             label: localizeMessage('main.menus.app.view.toggleDarkMode', 'Toggle Dark Mode'),
