--- jslib/electron/src/window.main.ts.orig	2021-11-19 15:48:42 UTC
+++ jslib/electron/src/window.main.ts
@@ -52,7 +52,7 @@ export class WindowMain {
                                 }
                                 this.win.focus();
                             }
-                            if (process.platform === 'win32' || process.platform === 'linux') {
+                            if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
                                 if (this.argvCallback != null) {
                                     this.argvCallback(argv);
                                 }
@@ -120,7 +120,7 @@ export class WindowMain {
             x: this.windowStates[Keys.mainWindowSize].x,
             y: this.windowStates[Keys.mainWindowSize].y,
             title: app.name,
-            icon: process.platform === 'linux' ? path.join(__dirname, '/images/icon.png') : undefined,
+            icon: (process.platform === 'linux' || process.platform === 'freebsd') ? path.join(__dirname, '/images/icon.png') : undefined,
             titleBarStyle: this.hideTitleBar && process.platform === 'darwin' ? 'hiddenInset' : undefined,
             show: false,
             backgroundColor: '#fff',
