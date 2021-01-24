--- ElectronClient/ElectronAppWrapper.js.orig	2020-02-26 10:59:51 UTC
+++ ElectronClient/ElectronAppWrapper.js
@@ -71,7 +71,7 @@ class ElectronAppWrapper {
 
 		// Linux icon workaround for bug https://github.com/electron-userland/electron-builder/issues/2098
 		// Fix: https://github.com/electron-userland/electron-builder/issues/2269
-		if (shim.isLinux()) windowOptions.icon = path.join(__dirname, '..', 'build/icons/128x128.png');
+		if (shim.isLinux() || shim.isFreeBSD()) windowOptions.icon = path.join(__dirname, '..', 'build/icons/128x128.png');
 
 		require('electron-context-menu')({
 			shouldShowMenu: (event, params) => {
