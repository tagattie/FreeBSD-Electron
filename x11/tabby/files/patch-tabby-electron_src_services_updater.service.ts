--- tabby-electron/src/services/updater.service.ts.orig	2023-02-20 10:40:49 UTC
+++ tabby-electron/src/services/updater.service.ts
@@ -25,7 +25,7 @@ export class ElectronUpdaterService extends UpdaterSer
         super()
         this.logger = log.create('updater')
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.electronUpdaterAvailable = false
             return
         }
