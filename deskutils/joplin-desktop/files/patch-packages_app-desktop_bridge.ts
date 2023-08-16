--- packages/app-desktop/bridge.ts.orig	2023-06-23 14:10:56 UTC
+++ packages/app-desktop/bridge.ts
@@ -274,7 +274,7 @@ export class Bridge {
 				execPath: process.env.PORTABLE_EXECUTABLE_FILE,
 			};
 			app.relaunch(options);
-		} else if (shim.isLinux() && linuxSafeRestart) {
+		} else if ((shim.isLinux() || shim.isFreeBSD()) && linuxSafeRestart) {
 			this.showInfoMessageBox(_('The app is now going to close. Please relaunch it to complete the process.'));
 		} else {
 			app.relaunch();
