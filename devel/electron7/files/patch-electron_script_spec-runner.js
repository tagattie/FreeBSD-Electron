--- electron/script/spec-runner.js.orig	2019-12-13 19:48:14 UTC
+++ electron/script/spec-runner.js
@@ -114,7 +114,7 @@ async function runElectronTests () {
 async function runRemoteBasedElectronTests () {
   let exe = path.resolve(BASE, utils.getElectronExec())
   const runnerArgs = ['electron/spec', ...unknownArgs.slice(2)]
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     runnerArgs.unshift(path.resolve(__dirname, 'dbus_mock.py'), exe)
     exe = 'python'
   }
