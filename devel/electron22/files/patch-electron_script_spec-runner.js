--- electron/script/spec-runner.js.orig	2023-01-18 11:12:36 UTC
+++ electron/script/spec-runner.js
@@ -124,7 +124,7 @@ async function runElectronTests () {
 async function runTestUsingElectron (specDir, testName) {
   let exe = path.resolve(BASE, utils.getElectronExec());
   const runnerArgs = [`electron/${specDir}`, ...unknownArgs.slice(2)];
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     runnerArgs.unshift(path.resolve(__dirname, 'dbus_mock.py'), exe);
     exe = 'python3';
   }
