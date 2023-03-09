--- packages/app-desktop/bridge.ts.orig	2022-11-15 07:35:09 UTC
+++ packages/app-desktop/bridge.ts
@@ -276,7 +276,7 @@ export class Bridge {
 				execPath: process.env.PORTABLE_EXECUTABLE_FILE,
 			};
 			app.relaunch(options);
-		} else if (shim.isLinux() && linuxSafeRestart) {
+		} else if ((shim.isLinux() || shim.isFreeBSD()) && linuxSafeRestart) {
 			this.showInfoMessageBox(_('The app is now going to close. Please relaunch it to complete the process.'));
 		} else {
 			app.relaunch();
