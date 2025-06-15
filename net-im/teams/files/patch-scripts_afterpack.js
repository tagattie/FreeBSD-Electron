--- scripts/afterpack.js.orig	2025-06-15 13:24:08 UTC
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
@@ -23,10 +23,10 @@ exports.default = async function afterPack(context) {
 exports.default = async function afterPack(context) {
   try {
     // Ensure release info is generated for Linux publishing
-    if (context.electronPlatformName === "linux") {
+    if (context.electronPlatformName === "linux" || context.electronPlatformName === "freebsd") {
       await generateReleaseInfoForLinux();
     }
-    
+
     const appPath = `${context.appOutDir}/${getAppFileName(context)}`;
     await chmod(appPath, 0o755);
     await flipFuses(appPath, {
@@ -42,14 +42,14 @@ async function generateReleaseInfoForLinux() {
 async function generateReleaseInfoForLinux() {
   try {
     console.log('🔄 Generating release info for Linux publishing...');
-    
+
     const projectRoot = path.join(__dirname, '..');
     const { releaseInfo } = await generateReleaseInfo(projectRoot);
-    
+
     console.log(`✅ Release info ready for Linux publishing`);
     console.log(`   Release Name: ${releaseInfo.releaseName}`);
     console.log(`   Release Date: ${releaseInfo.releaseDate}`);
-    
+
     return releaseInfo;
   } catch (error) {
     console.error('❌ Error generating release info:', error.message);
