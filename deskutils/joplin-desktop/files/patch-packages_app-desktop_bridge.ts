--- packages/app-desktop/bridge.ts.orig	2024-07-06 10:12:46 UTC
+++ packages/app-desktop/bridge.ts
@@ -472,7 +472,7 @@ export class Bridge {
 				execPath: process.env.PORTABLE_EXECUTABLE_FILE,
 			};
 			app.relaunch(options);
-		} else if (shim.isLinux() && linuxSafeRestart) {
+		} else if ((shim.isLinux() || shim.isFreeBSD()) && linuxSafeRestart) {
 			this.showInfoMessageBox(_('The app is now going to close. Please relaunch it to complete the process.'));
 		} else {
 			app.relaunch();
