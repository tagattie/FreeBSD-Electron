--- tabby-electron/src/services/updater.service.ts.orig	2023-11-21 09:19:23 UTC
+++ tabby-electron/src/services/updater.service.ts
@@ -25,7 +25,7 @@ export class ElectronUpdaterService extends UpdaterSer
         super()
         this.logger = log.create('updater')
 
-        if (process.platform === 'linux' || process.env.PORTABLE_EXECUTABLE_FILE) {
+        if (process.platform === 'linux' || process.platform === 'freebsd' || process.env.PORTABLE_EXECUTABLE_FILE) {
             this.electronUpdaterAvailable = false
             return
         }
