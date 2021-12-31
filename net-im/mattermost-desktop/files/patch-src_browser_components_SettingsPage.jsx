--- src/browser/components/SettingsPage.jsx.orig	2020-02-13 05:43:05 UTC
+++ src/browser/components/SettingsPage.jsx
@@ -392,7 +392,7 @@ export default class SettingsPage extends React.Compon
     const options = [];
 
     // MacOS has an option in the Dock, to set the app to autostart, so we choose to not support this option for OSX
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
       options.push(
         <Checkbox
           key='inputAutoStart'
@@ -442,7 +442,7 @@ export default class SettingsPage extends React.Compon
         </Checkbox>);
     }
 
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
       options.push(
         <Checkbox
           key='flashWindow'
@@ -505,7 +505,7 @@ export default class SettingsPage extends React.Compon
       );
     }
 
-    if (process.platform === 'darwin' || process.platform === 'linux') {
+    if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
       options.push(
         <Checkbox
           key='inputShowTrayIcon'
@@ -521,7 +521,7 @@ export default class SettingsPage extends React.Compon
         </Checkbox>);
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
       options.push(
         <FormGroup
           key='trayIconTheme'
@@ -550,7 +550,7 @@ export default class SettingsPage extends React.Compon
       );
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
       options.push(
         <Checkbox
           key='inputMinimizeToTray'
