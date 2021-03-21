--- jslib/src/electron/window.main.ts.orig	2021-03-15 22:11:51 UTC
+++ jslib/src/electron/window.main.ts
@@ -43,7 +43,7 @@ export class WindowMain {
                                 }
                                 this.win.focus();
                             }
-                            if (process.platform === 'win32' || process.platform === 'linux') {
+                            if (process.platform === 'win32' || (process.platform === 'linux' || process.platform === 'freebsd')) {
                                 if (this.argvCallback != null) {
                                     this.argvCallback(argv);
                                 }
@@ -111,7 +111,7 @@ export class WindowMain {
             x: this.windowStates[Keys.mainWindowSize].x,
             y: this.windowStates[Keys.mainWindowSize].y,
             title: app.name,
-            icon: process.platform === 'linux' ? path.join(__dirname, '/images/icon.png') : undefined,
+            icon: (process.platform === 'linux' || process.platform === 'freebsd') ? path.join(__dirname, '/images/icon.png') : undefined,
             titleBarStyle: this.hideTitleBar && process.platform === 'darwin' ? 'hiddenInset' : undefined,
             show: false,
             backgroundColor: '#fff',
