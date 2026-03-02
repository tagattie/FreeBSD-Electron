--- src/app/menus/appMenu/view.ts.orig	2026-02-24 16:38:27 UTC
+++ src/app/menus/appMenu/view.ts
@@ -126,7 +126,7 @@ export default function createViewMenu() {
         },
     }];
 
-    if (process.platform !== 'linux') {
+    if (process.platform !== 'linux' && process.platform !== 'freebsd') {
         viewSubMenu.push({
             role: 'togglefullscreen',
             label: localizeMessage('main.menus.app.view.fullscreen', 'Toggle Full Screen'),
@@ -193,7 +193,7 @@ export default function createViewMenu() {
         submenu: devToolsSubMenu,
     });
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         viewSubMenu.push({type: 'separator'});
         viewSubMenu.push({
             label: localizeMessage('main.menus.app.view.toggleDarkMode', 'Toggle Dark Mode'),
