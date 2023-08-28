--- apps/desktop/src/main/window.main.ts.orig	2023-08-24 18:31:12 UTC
+++ apps/desktop/src/main/window.main.ts
@@ -66,7 +66,7 @@ export class WindowMain {
                 }
                 this.win.focus();
               }
-              if (process.platform === "win32" || process.platform === "linux") {
+              if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
                 if (this.argvCallback != null) {
                   this.argvCallback(argv);
                 }
@@ -137,7 +137,7 @@ export class WindowMain {
       x: this.windowStates[mainWindowSizeKey].x,
       y: this.windowStates[mainWindowSizeKey].y,
       title: app.name,
-      icon: process.platform === "linux" ? path.join(__dirname, "/images/icon.png") : undefined,
+      icon: (process.platform === "linux" || process.platform === "freebsd") ? path.join(__dirname, "/images/icon.png") : undefined,
       titleBarStyle: process.platform === "darwin" ? "hiddenInset" : undefined,
       show: false,
       backgroundColor: await this.getBackgroundColor(),
