--- src/scripts/dock.js.orig	2020-02-13 07:40:22 UTC
+++ src/scripts/dock.js
@@ -37,7 +37,7 @@ const update = async (previousState) => {
 		}
 	}
 
-	if (process.platform === 'linux' || process.platform === 'win32') {
+	if (process.platform === 'linux' || process.platform === 'win32' || process.platform === 'freebsd') {
 		const image = state.hasTrayIcon ? getAppIconPath() : getTrayIconPath({ badge: state.badge });
 		remote.getCurrentWindow().setIcon(image);
 	}
