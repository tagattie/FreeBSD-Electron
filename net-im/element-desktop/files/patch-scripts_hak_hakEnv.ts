--- scripts/hak/hakEnv.ts.orig	2023-06-20 09:34:37 UTC
+++ scripts/hak/hakEnv.ts
@@ -81,6 +81,10 @@ export default class HakEnv {
         return this.target.platform === "linux";
     }
 
+    public isFreeBSD(): boolean {
+        return this.target.platform === "freebsd";
+    }
+
     public getTargetArch(): Arch {
         return this.target.arch;
     }
@@ -102,6 +106,6 @@ export default class HakEnv {
     }
 
     public wantsStaticSqlCipher(): boolean {
-        return !this.isLinux() || process.env.SQLCIPHER_BUNDLED == "1";
+        return !(this.isLinux() || this.isFreeBSD()) || process.env.SQLCIPHER_BUNDLED == "1";
     }
 }
