--- packages/app-desktop/ElectronAppWrapper.ts.orig	2023-12-24 11:26:28 UTC
+++ packages/app-desktop/ElectronAppWrapper.ts
@@ -148,7 +148,7 @@ export default class ElectronAppWrapper {
 
 		// Linux icon workaround for bug https://github.com/electron-userland/electron-builder/issues/2098
 		// Fix: https://github.com/electron-userland/electron-builder/issues/2269
-		if (shim.isLinux()) windowOptions.icon = path.join(__dirname, '..', 'build/icons/128x128.png');
+		if (shim.isLinux() || shim.isFreeBSD()) windowOptions.icon = path.join(__dirname, '..', 'build/icons/128x128.png');
 
 		this.win_ = new BrowserWindow(windowOptions);
 
