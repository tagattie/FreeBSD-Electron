--- src/app/menus/appMenu/view.ts.orig	2026-08-05 10:05:33 UTC
+++ src/app/menus/appMenu/view.ts
@@ -129,7 +129,7 @@ export default function createViewMenu() {
         },
     }];
 
-    if (process.platform !== 'linux') {
+    if (process.platform !== 'linux' && process.platform !== 'freebsd') {
         viewSubMenu.push({
             role: 'togglefullscreen',
             label: localizeMessage('main.menus.app.view.fullscreen', 'Toggle Full Screen'),
@@ -196,7 +196,7 @@ export default function createViewMenu() {
         submenu: devToolsSubMenu,
     });
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         viewSubMenu.push({type: 'separator'});
         viewSubMenu.push({
             label: localizeMessage('main.menus.app.view.toggleDarkMode', 'Toggle Dark Mode'),
