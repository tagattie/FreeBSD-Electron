--- src/renderer/components/SettingsPage.tsx.orig	2021-12-31 10:09:44 UTC
+++ src/renderer/components/SettingsPage.tsx
@@ -403,7 +403,7 @@ export default class SettingsPage extends React.PureCo
         const options = [];
 
         // MacOS has an option in the Dock, to set the app to autostart, so we choose to not support this option for OSX
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -519,7 +519,7 @@ export default class SettingsPage extends React.PureCo
                 </FormCheck>);
         }
 
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -587,7 +587,7 @@ export default class SettingsPage extends React.PureCo
             );
         }
 
-        if (window.process.platform === 'darwin' || window.process.platform === 'linux') {
+        if (window.process.platform === 'darwin' || window.process.platform === 'linux' || process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputShowTrayIcon'
@@ -606,7 +606,7 @@ export default class SettingsPage extends React.PureCo
                 </FormCheck>);
         }
 
-        if (window.process.platform === 'linux') {
+        if (window.process.platform === 'linux' || process.platform === 'freebsd') {
             options.push(
                 <FormGroup
                     key='trayIconTheme'
@@ -637,7 +637,7 @@ export default class SettingsPage extends React.PureCo
             );
         }
 
-        if (window.process.platform === 'linux') {
+        if (window.process.platform === 'linux' || process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputMinimizeToTray'
