--- electron/spec-main/api-crash-reporter-spec.ts.orig	2021-11-15 23:45:07 UTC
+++ electron/spec-main/api-crash-reporter-spec.ts
@@ -12,7 +12,7 @@ import * as fs from 'fs';
 import * as uuid from 'uuid';
 
 const isWindowsOnArm = process.platform === 'win32' && process.arch === 'arm64';
-const isLinuxOnArm = process.platform === 'linux' && process.arch.includes('arm');
+const isLinuxOnArm = ((process.platform === 'linux' || process.platform === 'freebsd') && process.arch.includes('arm'));
 
 type CrashInfo = {
   prod: string
@@ -45,7 +45,7 @@ function checkCrash (expectedProcessType: string, fiel
 
   // TODO(nornagon): minidumps are sometimes (not always) turning up empty on
   // 32-bit Linux.  Figure out why.
-  if (!(process.platform === 'linux' && process.arch === 'ia32')) {
+  if (!((process.platform === 'linux' || process.platform === 'freebsd') && process.arch === 'ia32')) {
     expect(fields.upload_file_minidump.length).to.be.greaterThan(0);
   }
 }
@@ -138,7 +138,7 @@ function waitForNewFileInDir (dir: string): Promise<st
 
 // TODO(nornagon): Fix tests on linux/arm.
 ifdescribe(!isLinuxOnArm && !process.mas && !process.env.DISABLE_CRASH_REPORTER_TESTS)('crashReporter module', function () {
-  for (const withLinuxCrashpad of (process.platform === 'linux' ? [false, true] : [false])) {
+  for (const withLinuxCrashpad of ((process.platform === 'linux' || process.platform === 'freebsd') ? [false, true] : [false])) {
     const crashpadExtraArgs = withLinuxCrashpad ? ['--enable-crashpad'] : [];
     describe(withLinuxCrashpad ? '(with crashpad)' : '', () => {
       describe('should send minidump', () => {
@@ -452,7 +452,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
             await bw.webContents.executeJavaScript('require(\'electron\').crashReporter.addExtraParameter(\'hello\', \'world\')');
             return bw.webContents.executeJavaScript('require(\'electron\').crashReporter.getParameters()');
           });
-          if (process.platform === 'linux') {
+          if (process.platform === 'linux' || process.platform === 'freebsd') {
             // On Linux, 'getParameters' will also include the global parameters,
             // because breakpad doesn't support global parameters.
             expect(rendererParameters).to.have.property('hello', 'world');
@@ -517,7 +517,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
           }
         }
 
-        const processList = process.platform === 'linux' ? ['main', 'renderer', 'sandboxed-renderer']
+        const processList = (process.platform === 'linux' || process.platform === 'freebsd') ? ['main', 'renderer', 'sandboxed-renderer']
           : ['main', 'renderer', 'sandboxed-renderer', 'node'];
         for (const crashingProcess of processList) {
           describe(`when ${crashingProcess} crashes`, () => {
@@ -529,7 +529,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
                 return app.getPath('crashDumps');
               });
               let reportsDir = crashesDir;
-              if (process.platform === 'darwin' || (process.platform === 'linux' && withLinuxCrashpad)) {
+              if (process.platform === 'darwin' || ((process.platform === 'linux' || process.platform === 'freebsd') && withLinuxCrashpad)) {
                 reportsDir = path.join(crashesDir, 'completed');
               } else if (process.platform === 'win32') {
                 reportsDir = path.join(crashesDir, 'reports');
@@ -538,7 +538,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
               crash(crashingProcess, remotely);
               const newFiles = await newFileAppeared;
               expect(newFiles.length).to.be.greaterThan(0);
-              if (process.platform === 'linux' && !withLinuxCrashpad) {
+              if ((process.platform === 'linux' || process.platform === 'freebsd') && !withLinuxCrashpad) {
                 if (crashingProcess === 'main') {
                   expect(newFiles[0]).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{8}-[0-9a-f]{8}\.dmp$/);
                 } else {
@@ -563,7 +563,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
               expect(remoteCrashesDir).to.equal(crashesDir);
 
               let reportsDir = crashesDir;
-              if (process.platform === 'darwin' || (process.platform === 'linux' && withLinuxCrashpad)) {
+              if (process.platform === 'darwin' || ((process.platform === 'linux' || process.platform === 'freebsd') && withLinuxCrashpad)) {
                 reportsDir = path.join(crashesDir, 'completed');
               } else if (process.platform === 'win32') {
                 reportsDir = path.join(crashesDir, 'reports');
@@ -572,7 +572,7 @@ ifdescribe(!isLinuxOnArm && !process.mas && !process.e
               crash(crashingProcess, remotely);
               const newFiles = await newFileAppeared;
               expect(newFiles.length).to.be.greaterThan(0);
-              if (process.platform === 'linux' && !withLinuxCrashpad) {
+              if ((process.platform === 'linux' || process.platform === 'freebsd') && !withLinuxCrashpad) {
                 if (crashingProcess === 'main') {
                   expect(newFiles[0]).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{8}-[0-9a-f]{8}\.dmp$/);
                 } else {
