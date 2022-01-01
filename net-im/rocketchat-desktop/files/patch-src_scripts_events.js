--- src/scripts/events.js.orig	2020-02-13 07:41:03 UTC
+++ src/scripts/events.js
@@ -44,7 +44,7 @@ const updatePreferences = () => {
 	const mainWindow = getCurrentWindow();
 	const showWindowOnUnreadChanged = localStorage.getItem('showWindowOnUnreadChanged') === 'true';
 	const hasTrayIcon = localStorage.getItem('hideTray')
-		? localStorage.getItem('hideTray') !== 'true' : process.platform !== 'linux';
+		? localStorage.getItem('hideTray') !== 'true' : (process.platform !== 'linux' && process.platform !== 'freebsd');
 	const hasMenuBar = localStorage.getItem('autohideMenu') !== 'true';
 	const hasSidebar = localStorage.getItem('sidebar-closed') !== 'true';
 
