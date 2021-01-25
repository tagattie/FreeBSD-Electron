--- packages/app-desktop/bridge.ts.orig	2021-01-24 10:24:46 UTC
+++ packages/app-desktop/bridge.ts
@@ -210,7 +210,7 @@ export class Bridge {
 				execPath: process.env.PORTABLE_EXECUTABLE_FILE,
 			};
 			app.relaunch(options);
-		} else if (shim.isLinux()) {
+		} else if (shim.isLinux() || shim.isFreeBSD()) {
 			this.showInfoMessageBox(_('The app is now going to close. Please relaunch it to complete the process.'));
 		} else {
 			app.relaunch();
