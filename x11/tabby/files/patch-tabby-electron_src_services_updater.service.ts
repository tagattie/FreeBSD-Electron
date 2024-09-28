--- tabby-electron/src/services/updater.service.ts.orig	2024-09-26 08:04:31 UTC
+++ tabby-electron/src/services/updater.service.ts
@@ -23,7 +23,7 @@ export class ElectronUpdaterService extends UpdaterSer
         super()
         this.logger = log.create('updater')
 
-        if (process.platform === 'linux' || process.env.PORTABLE_EXECUTABLE_FILE) {
+        if (process.platform === 'linux' || process.platform === 'freebsd' || process.env.PORTABLE_EXECUTABLE_FILE) {
             this.electronUpdaterAvailable = false
             return
         }
