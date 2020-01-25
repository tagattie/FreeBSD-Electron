--- jslib/src/electron/window.main.ts.orig	2020-01-20 05:07:09 UTC
+++ jslib/src/electron/window.main.ts
@@ -98,7 +98,7 @@ export class WindowMain {
             x: this.windowStates[Keys.mainWindowSize].x,
             y: this.windowStates[Keys.mainWindowSize].y,
             title: app.getName(),
-            icon: process.platform === 'linux' ? path.join(__dirname, '/images/icon.png') : undefined,
+            icon: (process.platform === 'linux' || process.platform === 'freebsd') ? path.join(__dirname, '/images/icon.png') : undefined,
             titleBarStyle: this.hideTitleBar && process.platform === 'darwin' ? 'hiddenInset' : undefined,
             show: false,
             alwaysOnTop: this.enableAlwaysOnTop,
