--- src/common/config/index.ts.orig	2025-11-18 22:32:29 UTC
+++ src/common/config/index.ts
@@ -242,7 +242,7 @@ export class Config extends EventEmitter {
     }
 
     get canUpgrade() {
-        return process.env.NODE_ENV === 'test' || (this.canUpgradeValue && this.buildConfigData?.enableAutoUpdater && !(process.platform === 'linux' && !process.env.APPIMAGE) && !(process.platform === 'win32' && this.registryConfigData?.enableAutoUpdater === false));
+        return process.env.NODE_ENV === 'test' || (this.canUpgradeValue && this.buildConfigData?.enableAutoUpdater && !(process.platform === 'linux' && !process.env.APPIMAGE) && !(procss.platform === 'freebsd') && !(process.platform === 'win32' && this.registryConfigData?.enableAutoUpdater === false));
     }
 
     get autoCheckForUpdates() {
