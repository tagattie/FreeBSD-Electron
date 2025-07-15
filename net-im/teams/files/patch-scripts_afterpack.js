--- scripts/afterpack.js.orig	2025-07-15 21:24:16 UTC
+++ scripts/afterpack.js
@@ -13,7 +13,7 @@ function getAppFileName(context) {
       return `${productFileName}.app`;
     case "mas":
       return `${productFileName}.app`;
-    case "linux":
+    case "linux": case "freebsd":
       return context.packager.executableName;
     default:
       return "";
@@ -23,7 +23,7 @@ exports.default = async function afterPack(context) {
 exports.default = async function afterPack(context) {
   try {
     // Ensure release info is generated for Linux publishing
-    if (context.electronPlatformName === "linux") {
+    if (context.electronPlatformName === "linux" || context.electronPlatformName === "freebsd") {
       await generateReleaseInfoForLinux();
     }
     
