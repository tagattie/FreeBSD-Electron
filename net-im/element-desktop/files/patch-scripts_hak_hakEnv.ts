--- scripts/hak/hakEnv.ts.orig	2023-05-24 07:37:45 UTC
+++ scripts/hak/hakEnv.ts
@@ -78,7 +78,7 @@ export default class HakEnv {
     }
 
     public isLinux(): boolean {
-        return this.target.platform === "linux";
+        return (this.target.platform === "linux" || this.target.platform === "freebsd");
     }
 
     public getTargetArch(): Arch {
