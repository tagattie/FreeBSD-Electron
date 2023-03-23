--- apps/desktop/src/main/window.main.ts.orig	2023-03-22 14:48:32 UTC
+++ apps/desktop/src/main/window.main.ts
@@ -48,7 +48,7 @@ export class WindowMain {
                 }
                 this.win.focus();
               }
-              if (process.platform === "win32" || process.platform === "linux") {
+              if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
                 if (this.argvCallback != null) {
                   this.argvCallback(argv);
                 }
@@ -117,7 +117,7 @@ export class WindowMain {
       x: this.windowStates[mainWindowSizeKey].x,
       y: this.windowStates[mainWindowSizeKey].y,
       title: app.name,
-      icon: process.platform === "linux" ? path.join(__dirname, "/images/icon.png") : undefined,
+      icon: (process.platform === "linux" || process.platform === "freebsd") ? path.join(__dirname, "/images/icon.png") : undefined,
       titleBarStyle: process.platform === "darwin" ? "hiddenInset" : undefined,
       show: false,
       backgroundColor: "#fff",
