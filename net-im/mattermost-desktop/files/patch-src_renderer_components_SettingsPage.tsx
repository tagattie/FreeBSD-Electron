--- src/renderer/components/SettingsPage.tsx.orig	2024-05-16 20:45:52 UTC
+++ src/renderer/components/SettingsPage.tsx
@@ -507,7 +507,7 @@ class SettingsPage extends React.PureComponent<Props, 
         const options = [];
 
         // MacOS has an option in the Dock, to set the app to autostart, so we choose to not support this option for OSX
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -691,7 +691,7 @@ class SettingsPage extends React.PureComponent<Props, 
                 </FormCheck>);
         }
 
-        if (window.process.platform === 'win32' || window.process.platform === 'linux') {
+        if (window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck>
                     <FormCheck.Input
@@ -711,7 +711,7 @@ class SettingsPage extends React.PureComponent<Props, 
                             id='renderer.components.settingsPage.flashWindow.description'
                             defaultMessage='If enabled, the taskbar icon will flash for a few seconds when a new message is received.'
                         />
-                        {window.process.platform === 'linux' && (
+                        {window.process.platform === 'linux' || window.process.platform === 'freebsd' && (
                             <>
                                 <br/>
                                 <em>
@@ -800,7 +800,7 @@ class SettingsPage extends React.PureComponent<Props, 
             );
         }
 
-        if (window.process.platform === 'darwin' || window.process.platform === 'linux') {
+        if (window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputShowTrayIcon'
@@ -833,7 +833,7 @@ class SettingsPage extends React.PureComponent<Props, 
         }
 
         if (this.state.showTrayIcon) {
-            if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+            if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
                 options.push(
                     <FormGroup
                         key='trayIconTheme'
@@ -897,7 +897,7 @@ class SettingsPage extends React.PureComponent<Props, 
             }
         }
 
-        if (window.process.platform === 'linux' || window.process.platform === 'win32') {
+        if (window.process.platform === 'linux' || window.process.platform === 'win32' || window.process.platform === 'freebsd') {
             options.push(
                 <FormCheck
                     key='inputMinimizeToTray'
