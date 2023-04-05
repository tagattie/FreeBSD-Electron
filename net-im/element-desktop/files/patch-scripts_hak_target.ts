--- scripts/hak/target.ts.orig	2023-03-31 14:39:31 UTC
+++ scripts/hak/target.ts
@@ -26,6 +26,7 @@ export type TargetId =
     | "i686-pc-windows-msvc"
     | "x86_64-pc-windows-msvc"
     | "aarch64-pc-windows-msvc"
+    | "x86_64-unknown-freebsd"
     | "i686-unknown-linux-musl"
     | "i686-unknown-linux-gnu"
     | "x86_64-unknown-linux-musl"
@@ -36,7 +37,7 @@ export type TargetId =
     | "powerpc64le-unknown-linux-gnu";
 
 // Values are expected to match those used in `process.platform`.
-export type Platform = "darwin" | "linux" | "win32";
+export type Platform = "darwin" | "freebsd" | "linux" | "win32";
 
 // Values are expected to match those used in `process.arch`.
 export type Arch = "arm64" | "ia32" | "x64" | "ppc64" | "universal";
@@ -106,6 +107,12 @@ const aarch64WindowsMsvc: WindowsTarget = {
     vcVarsArch: "arm64",
 };
 
+const x8664UnknownFreebsd: Target = {
+    id: "x86_64-unknown-freebsd",
+    platform: "freebsd",
+    arch: "x64",
+};
+
 const x8664UnknownLinuxGnu: LinuxTarget = {
     id: "x86_64-unknown-linux-gnu",
     platform: "linux",
@@ -171,6 +178,8 @@ export const TARGETS: Record<TargetId, Target> = {
     "i686-pc-windows-msvc": i686PcWindowsMsvc,
     "x86_64-pc-windows-msvc": x8664PcWindowsMsvc,
     "aarch64-pc-windows-msvc": aarch64WindowsMsvc,
+    // FreeBSD
+    "x86_64-unknown-freebsd": x8664UnknownFreebsd,
     // Linux
     "i686-unknown-linux-musl": i686UnknownLinuxMusl,
     "i686-unknown-linux-gnu": i686UnknownLinuxGnu,
