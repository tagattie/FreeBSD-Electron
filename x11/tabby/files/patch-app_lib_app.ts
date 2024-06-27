--- app/lib/app.ts.orig	2024-06-22 19:43:37 UTC
+++ app/lib/app.ts
@@ -63,7 +63,7 @@ export class Application {
             }
         })
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             app.commandLine.appendSwitch('no-sandbox')
             if ((this.configStore.appearance?.opacity || 1) !== 1) {
                 app.commandLine.appendSwitch('enable-transparent-visuals')
@@ -183,7 +183,7 @@ export class Application {
     }
 
     enableTray (): void {
-        if (!!this.tray || process.platform === 'linux' || (this.configStore.hideTray ?? false) === true) {
+        if (!!this.tray || process.platform === 'linux' || process.platform === 'freebsd' || (this.configStore.hideTray ?? false) === true) {
             return
         }
 
@@ -209,7 +209,7 @@ export class Application {
     }
 
     disableTray (): void {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             return
         }
         this.tray?.destroy()
