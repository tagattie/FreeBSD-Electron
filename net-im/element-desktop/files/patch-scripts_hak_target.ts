--- scripts/hak/target.ts.orig	2023-03-15 13:50:04 UTC
+++ scripts/hak/target.ts
@@ -25,6 +25,7 @@ export type TargetId =
     | "universal-apple-darwin"
     | "i686-pc-windows-msvc"
     | "x86_64-pc-windows-msvc"
+    | "x86_64-unknown-freebsd"
     | "i686-unknown-linux-musl"
     | "i686-unknown-linux-gnu"
     | "x86_64-unknown-linux-musl"
@@ -35,7 +36,7 @@ export type TargetId =
     | "powerpc64le-unknown-linux-gnu";
 
 // Values are expected to match those used in `process.platform`.
-export type Platform = "darwin" | "linux" | "win32";
+export type Platform = "darwin" | "freebsd" | "linux" | "win32";
 
 // Values are expected to match those used in `process.arch`.
 export type Arch = "arm64" | "ia32" | "x64" | "ppc64" | "universal";
@@ -98,6 +99,12 @@ const x8664PcWindowsMsvc: WindowsTarget = {
     vcVarsArch: "amd64",
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
@@ -162,6 +169,8 @@ export const TARGETS: Record<TargetId, Target> = {
     // Windows
     "i686-pc-windows-msvc": i686PcWindowsMsvc,
     "x86_64-pc-windows-msvc": x8664PcWindowsMsvc,
+    // FreeBSD
+    "x86_64-unknown-freebsd": x8664UnknownFreebsd,
     // Linux
     "i686-unknown-linux-musl": i686UnknownLinuxMusl,
     "i686-unknown-linux-gnu": i686UnknownLinuxGnu,
