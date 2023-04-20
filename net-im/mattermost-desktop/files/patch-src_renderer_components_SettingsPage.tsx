--- src/renderer/components/SettingsPage.tsx.orig	2023-04-04 12:30:25 UTC
+++ src/renderer/components/SettingsPage.tsx
@@ -503,7 +503,7 @@ class SettingsPage extends React.PureComponent<Props, 
         const options = [];
 
         // MacOS has an option in the Dock, to set the app to autostart, so we choose to not support this option for OSX
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -687,7 +687,7 @@ class SettingsPage extends React.PureComponent<Props, 
                 </FormCheck>);
         }
 
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -707,7 +707,7 @@ class SettingsPage extends React.PureComponent<Props, 
                             id='renderer.components.settingsPage.flashWindow.description'
                             defaultMessage='If enabled, the taskbar icon will flash for a few seconds when a new message is received.'
                         />
-                        {window.process.platform === 'linux' && (
+                        {window.process.platform === 'linux' || window.process.platform === 'freebsd' && (
                             <>
                                 <br/>
                                 <em>
@@ -796,7 +796,7 @@ class SettingsPage extends React.PureComponent<Props, 
             );
         }
 
-        if (window.process.platform === 'darwin' || window.process.platform === 'linux') {
+        if (window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputShowTrayIcon'
@@ -829,7 +829,7 @@ class SettingsPage extends React.PureComponent<Props, 
         }
 
         if (this.state.showTrayIcon) {
-            if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+            if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
                 options.push(
                     <FormGroup
                         key='trayIconTheme'
@@ -893,7 +893,7 @@ class SettingsPage extends React.PureComponent<Props, 
             }
         }
 
-        if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+        if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputMinimizeToTray'
