--- src/main.js.orig	2020-02-13 05:47:41 UTC
+++ src/main.js
@@ -229,7 +229,7 @@ function initializeMainWindowListeners() {
 //
 
 function handleConfigUpdate(configData) {
-  if (process.platform === 'win32' || process.platform === 'linux') {
+  if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
     const appLauncher = new AutoLauncher();
     const autoStartTask = config.autostart ? appLauncher.enable() : appLauncher.disable();
     autoStartTask.then(() => {
@@ -697,7 +697,7 @@ function handleDownloadURLEvent(event, url) {
 }
 
 function handleNotifiedEvent() {
-  if (process.platform === 'win32' || process.platform === 'linux') {
+  if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
     if (config.notifications.flashWindow === 2) {
       mainWindow.flashFrame(true);
     }
@@ -757,7 +757,7 @@ function handleUpdateMenuEvent(event, configData) {
   // set up context menu for tray icon
   if (shouldShowTrayIcon()) {
     const tMenu = trayMenu.createMenu(mainWindow, configData, global.isDev);
-    if (process.platform === 'darwin' || process.platform === 'linux') {
+    if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
       // store the information, if the tray was initialized, for checking in the settings, if the application
       // was restarted after setting "Show icon on menu bar"
       if (trayIcon) {
@@ -924,7 +924,7 @@ function getTrayImages() {
     switchMenuIconImages(icons, systemPreferences.isDarkMode());
     return icons;
   }
-  case 'linux':
+  case 'linux': case 'freebsd':
   {
     const theme = config.trayIconTheme;
     try {
@@ -974,7 +974,7 @@ function shouldShowTrayIcon() {
   if (process.platform === 'win32') {
     return true;
   }
-  if (['darwin', 'linux'].includes(process.platform) && config.showTrayIcon === true) {
+  if (['darwin', 'linux', 'freebsd'].includes(process.platform) && config.showTrayIcon === true) {
     return true;
   }
   return false;
