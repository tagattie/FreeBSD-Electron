--- packages/app-desktop/bridge.ts.orig	2023-08-27 10:35:48 UTC
+++ packages/app-desktop/bridge.ts
@@ -272,7 +272,7 @@ export class Bridge {
 				execPath: process.env.PORTABLE_EXECUTABLE_FILE,
 			};
 			app.relaunch(options);
-		} else if (shim.isLinux() && linuxSafeRestart) {
+		} else if ((shim.isLinux() || shim.isFreeBSD()) && linuxSafeRestart) {
 			this.showInfoMessageBox(_('The app is now going to close. Please relaunch it to complete the process.'));
 		} else {
 			app.relaunch();
