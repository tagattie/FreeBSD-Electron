--- electron/spec-main/version-bump-spec.ts.orig	2021-11-08 18:41:28 UTC
+++ electron/spec-main/version-bump-spec.ts
@@ -137,7 +137,7 @@ describe('version-bumper', () => {
 
   // On macOS Circle CI we don't have a real git environment due to running
   // gclient sync on a linux machine. These tests therefore don't run as expected.
-  ifdescribe(!(process.platform === 'linux' && process.arch.indexOf('arm') === 0) && process.platform !== 'darwin')('nextVersion', () => {
+  ifdescribe(!((process.platform === 'linux' || process.platform === 'freebsd') && process.arch.indexOf('arm') === 0) && process.platform !== 'darwin')('nextVersion', () => {
     const nightlyPattern = /[0-9.]*(-nightly.(\d{4})(\d{2})(\d{2}))$/g;
     const betaPattern = /[0-9.]*(-beta[0-9.]*)/g;
 
