--- electron/spec-main/api-app-spec.ts.orig	2020-06-01 16:32:39 UTC
+++ electron/spec-main/api-app-spec.ts
@@ -130,7 +130,7 @@ describe('app module', () => {
   describe('app.getLocaleCountryCode()', () => {
     it('should be empty or have length of two', () => {
       let expectedLength = 2
-      if (isCI && process.platform === 'linux') {
+      if (isCI && (process.platform === 'linux' || process.platform === 'freebsd')) {
         // Linux CI machines have no locale.
         expectedLength = 0
       }
@@ -192,7 +192,7 @@ describe('app module', () => {
     })
 
     it('exits gracefully', async function () {
-      if (!['darwin', 'linux'].includes(process.platform)) {
+      if (!['darwin', 'linux', 'freebsd'].includes(process.platform)) {
         this.skip()
         return
       }
@@ -536,7 +536,7 @@ describe('app module', () => {
   describe('app.badgeCount', () => {
     const platformIsNotSupported =
         (process.platform === 'win32') ||
-        (process.platform === 'linux' && !app.isUnityRunning())
+        ((process.platform === 'linux' || process.platform === 'freebsd') && !app.isUnityRunning())
     const platformIsSupported = !platformIsNotSupported
 
     const expectedBadgeCount = 42
@@ -570,7 +570,7 @@ describe('app module', () => {
     ]
 
     before(function () {
-      if (process.platform === 'linux' || process.mas) this.skip()
+      if (process.platform === 'linux' || process.platform === 'freebsd' || process.mas) this.skip()
     })
 
     beforeEach(() => {
@@ -646,7 +646,7 @@ describe('app module', () => {
   })
 
   describe('accessibilitySupportEnabled property', () => {
-    if (process.platform === 'linux') return
+    if (process.platform === 'linux' || process.platform === 'freebsd') return
 
     it('returns whether the Chrome has accessibility APIs enabled', () => {
       expect(app.accessibilitySupportEnabled).to.be.a('boolean')
@@ -683,6 +683,7 @@ describe('app module', () => {
     const logsPaths = {
       'darwin': path.resolve(homedir(), 'Library', 'Logs'),
       'linux': path.resolve(homedir(), 'AppData', app.name),
+      'freebsd': path.resolve(homedir(), 'AppData', app.name),
       'win32': path.resolve(homedir(), 'AppData', app.name),
     }
 
@@ -759,7 +760,7 @@ describe('app module', () => {
     let w: BrowserWindow
 
     before(function () {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip()
       }
       session.fromPartition('empty-certificate').setCertificateVerifyProc((req, cb) => { cb(0) })
@@ -916,7 +917,7 @@ describe('app module', () => {
       // We can't expect particular app names here, but these protocols should
       // at least have _something_ registered. Except on our Linux CI
       // environment apparently.
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip()
       }
 
@@ -990,7 +991,7 @@ describe('app module', () => {
     // doesn't affect nested `describe`s.
     beforeEach(function () {
       // FIXME Get these specs running on Linux CI
-      if (process.platform === 'linux' && isCI) {
+      if ((process.platform === 'linux' || process.platform === 'freebsd') && isCI) {
         this.skip()
       }
     })
@@ -1060,7 +1061,7 @@ describe('app module', () => {
           expect(entry.memory).to.have.property('privateBytes').that.is.greaterThan(0)
         }
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
           expect(entry.sandboxed).to.be.a('boolean')
         }
 
@@ -1127,7 +1128,7 @@ describe('app module', () => {
 
     it('succeeds with complete GPUInfo', async () => {
       const completeInfo = await getGPUInfo('complete')
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // For linux and macOS complete info is same as basic info
         await verifyBasicGPUInfo(completeInfo)
         const basicInfo = await getGPUInfo('basic')
@@ -1155,7 +1156,7 @@ describe('app module', () => {
     const socketPath = process.platform === 'win32' ? '\\\\.\\pipe\\electron-mixed-sandbox' : '/tmp/electron-mixed-sandbox'
 
     beforeEach(function (done) {
-      if (process.platform === 'linux' && (process.arch === 'arm64' || process.arch === 'arm')) {
+      if ((process.platform === 'linux' || process.platform === 'freebsd') && (process.arch === 'arm64' || process.arch === 'arm')) {
         // Our ARM tests are run on VSTS rather than CircleCI, and the Docker
         // setup on VSTS disallows syscalls that Chrome requires for setting up
         // sandboxing.
