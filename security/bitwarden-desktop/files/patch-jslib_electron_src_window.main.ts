--- jslib/electron/src/window.main.ts.orig	2022-02-11 20:26:02 UTC
+++ jslib/electron/src/window.main.ts
@@ -44,7 +44,7 @@ export class WindowMain {
                 }
                 this.win.focus();
               }
-              if (process.platform === "win32" || process.platform === "linux") {
+              if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
                 if (this.argvCallback != null) {
                   this.argvCallback(argv);
                 }
@@ -113,7 +113,7 @@ export class WindowMain {
       x: this.windowStates[mainWindowSizeKey].x,
       y: this.windowStates[mainWindowSizeKey].y,
       title: app.name,
-      icon: process.platform === "linux" ? path.join(__dirname, "/images/icon.png") : undefined,
+      icon: (process.platform === "linux" || process.platform === "freebsd") ? path.join(__dirname, "/images/icon.png") : undefined,
       titleBarStyle: this.hideTitleBar && process.platform === "darwin" ? "hiddenInset" : undefined,
       show: false,
       backgroundColor: "#fff",
