--- src/renderer/components/SettingsPage.tsx.orig	2024-12-16 19:52:04 UTC
+++ src/renderer/components/SettingsPage.tsx
@@ -532,7 +532,7 @@ class SettingsPage extends React.PureComponent<Props, 
         const options = [];
 
         // MacOS has an option in the Dock, to set the app to autostart, so we choose to not support this option for OSX
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -742,7 +742,7 @@ class SettingsPage extends React.PureComponent<Props, 
                 </FormText>
             </FormCheck>);
 
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -762,7 +762,7 @@ class SettingsPage extends React.PureComponent<Props, 
                             id='renderer.components.settingsPage.flashWindow.description'
                             defaultMessage='If enabled, the taskbar icon will flash for a few seconds when a new message is received.'
                         />
-                        {window.process.platform === 'linux' && (
+                        {window.process.platform === 'linux' || window.process.platform === 'freebsd' && (
                             <>
                                 <br/>
                                 <em>
@@ -851,7 +851,7 @@ class SettingsPage extends React.PureComponent<Props, 
             );
         }
 
-        if (window.process.platform === 'darwin' || window.process.platform === 'linux') {
+        if (window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputShowTrayIcon'
@@ -884,7 +884,7 @@ class SettingsPage extends React.PureComponent<Props, 
         }
 
         if (this.state.showTrayIcon) {
-            if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+            if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
                 options.push(
                     <FormGroup
                         key='trayIconTheme'
@@ -948,7 +948,7 @@ class SettingsPage extends React.PureComponent<Props, 
             }
         }
 
-        if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+        if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputMinimizeToTray'
