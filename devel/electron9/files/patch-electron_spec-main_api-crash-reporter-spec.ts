--- electron/spec-main/api-crash-reporter-spec.ts.orig	2020-05-18 21:17:08 UTC
+++ electron/spec-main/api-crash-reporter-spec.ts
@@ -13,7 +13,7 @@ import * as uuid from 'uuid';
 import * as rimraf from 'rimraf';
 
 const isWindowsOnArm = process.platform === 'win32' && process.arch === 'arm64';
-const isLinuxOnArm = process.platform === 'linux' && process.arch.includes('arm');
+const isLinuxOnArm = (process.platform === 'linux' && process.arch.includes('arm')) || process.platform === 'freebsd';
 
 const afterTest: ((() => void) | (() => Promise<void>))[] = [];
 async function cleanup () {
@@ -52,7 +52,7 @@ function checkCrash (expectedProcessType: string, fiel
 
   // TODO(nornagon): minidumps are sometimes (not always) turning up empty on
   // 32-bit Linux.  Figure out why.
-  if (!(process.platform === 'linux' && process.arch === 'ia32')) {
+  if (!((process.platform === 'linux' || process.platform === 'freebsd') && process.arch === 'ia32')) {
     expect(fields.upload_file_minidump.length).to.be.greaterThan(0);
   }
 }
@@ -474,7 +474,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
         await bw.webContents.executeJavaScript(`require('electron').crashReporter.addExtraParameter('hello', 'world')`);
         return bw.webContents.executeJavaScript(`require('electron').crashReporter.getParameters()`);
       });
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // On Linux, 'getParameters' will also include the global parameters,
         // because breakpad doesn't support global parameters.
         expect(rendererParameters).to.have.property('hello', 'world');
@@ -546,7 +546,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
       // TODO(nornagon): breakpad on linux disables itself when uploadToServer
       // is false, so we should figure out a different way to test the crash
       // dump dir on linux.
-      ifdescribe(process.platform !== 'linux')(`when ${crashingProcess} crashes`, () => {
+      ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')(`when ${crashingProcess} crashes`, () => {
         it('stores crashes in the crash dump directory when uploadToServer: false', async () => {
           const { remotely } = await startRemoteControlApp();
           const crashesDir = await remotely(() => {
