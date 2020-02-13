--- src/main.js.orig	2020-02-13 07:39:22 UTC
+++ src/main.js
@@ -42,7 +42,7 @@ const prepareApp = () => {
 	app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');
 
 	// TODO: make it a setting
-	if (process.platform === 'linux') {
+	if (process.platform === 'linux' || process.platform === 'freebsd') {
 		app.disableHardwareAcceleration();
 	}
 
