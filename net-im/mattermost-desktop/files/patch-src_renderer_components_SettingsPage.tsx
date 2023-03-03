--- src/renderer/components/SettingsPage.tsx.orig	2022-12-06 14:05:15 UTC
+++ src/renderer/components/SettingsPage.tsx
@@ -521,7 +521,7 @@ class SettingsPage extends React.PureComponent<Props, 
         const options = [];
 
         // MacOS has an option in the Dock, to set the app to autostart, so we choose to not support this option for OSX
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -705,7 +705,7 @@ class SettingsPage extends React.PureComponent<Props, 
                 </FormCheck>);
         }
 
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -725,7 +725,7 @@ class SettingsPage extends React.PureComponent<Props, 
                             id='renderer.components.settingsPage.flashWindow.description'
                             defaultMessage='If enabled, the taskbar icon will flash for a few seconds when a new message is received.'
                         />
-                        {window.process.platform === 'linux' && (
+                        {window.process.platform === 'linux' || window.process.platform === 'freebsd' && (
                             <>
                                 <br/>
                                 <em>
@@ -814,7 +814,7 @@ class SettingsPage extends React.PureComponent<Props, 
             );
         }
 
-        if (window.process.platform === 'darwin' || window.process.platform === 'linux') {
+        if (window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputShowTrayIcon'
@@ -847,7 +847,7 @@ class SettingsPage extends React.PureComponent<Props, 
         }
 
         if (this.state.showTrayIcon) {
-            if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+            if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
                 options.push(
                     <FormGroup
                         key='trayIconTheme'
@@ -911,7 +911,7 @@ class SettingsPage extends React.PureComponent<Props, 
             }
         }
 
-        if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+        if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputMinimizeToTray'
