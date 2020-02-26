--- app/menu.js.orig	2020-02-25 06:52:14 UTC
+++ app/menu.js
@@ -2,7 +2,7 @@ const { app, Menu } = require('electron')
 const { checkForUpdates } = require('./updater')
 
 const isMac = process.platform === 'darwin'
-const isLinux = process.platform === 'linux'
+const isLinux = (process.platform === 'linux' || process.platform === 'freebsd')
 
 const template = [
   // { role: 'appMenu' }
