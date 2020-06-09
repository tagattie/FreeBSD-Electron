--- electron/spec-main/api-app-spec.ts.orig	2020-06-02 18:14:21 UTC
+++ electron/spec-main/api-app-spec.ts
@@ -122,7 +122,7 @@ describe('app module', () => {
   describe('app.getLocaleCountryCode()', () => {
     it('should be empty or have length of two', () => {
       let expectedLength = 2;
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // Linux CI machines have no locale.
         expectedLength = 0;
       }
@@ -178,7 +178,7 @@ describe('app module', () => {
     });
 
     it('exits gracefully', async function () {
-      if (!['darwin', 'linux'].includes(process.platform)) {
+      if (!['darwin', 'linux', 'freebsd'].includes(process.platform)) {
         this.skip();
         return;
       }
@@ -530,7 +530,7 @@ describe('app module', () => {
   describe('app.badgeCount', () => {
     const platformIsNotSupported =
         (process.platform === 'win32') ||
-        (process.platform === 'linux' && !app.isUnityRunning());
+        ((process.platform === 'linux' || process.platform === 'freebsd') && !app.isUnityRunning());
     const platformIsSupported = !platformIsNotSupported;
 
     const expectedBadgeCount = 42;
@@ -586,7 +586,7 @@ describe('app module', () => {
     ];
 
     before(function () {
-      if (process.platform === 'linux' || process.mas) this.skip();
+      if (process.platform === 'linux' || process.platform === 'freebsd' || process.mas) this.skip();
     });
 
     beforeEach(() => {
@@ -661,7 +661,7 @@ describe('app module', () => {
     });
   });
 
-  ifdescribe(process.platform !== 'linux')('accessibilitySupportEnabled property', () => {
+  ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('accessibilitySupportEnabled property', () => {
     it('with properties', () => {
       it('can set accessibility support enabled', () => {
         expect(app.accessibilitySupportEnabled).to.eql(false);
@@ -759,7 +759,7 @@ describe('app module', () => {
     let w: BrowserWindow;
 
     before(function () {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip();
       }
       session.fromPartition('empty-certificate').setCertificateVerifyProc((req, cb) => { cb(0); });
@@ -916,7 +916,7 @@ describe('app module', () => {
       // We can't expect particular app names here, but these protocols should
       // at least have _something_ registered. Except on our Linux CI
       // environment apparently.
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip();
       }
 
@@ -979,7 +979,7 @@ describe('app module', () => {
   });
 
   // FIXME Get these specs running on Linux CI
-  ifdescribe(process.platform !== 'linux')('getFileIcon() API', () => {
+  ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('getFileIcon() API', () => {
     const iconPath = path.join(__dirname, 'fixtures/assets/icon.ico');
     const sizes = {
       small: 16,
@@ -1052,7 +1052,7 @@ describe('app module', () => {
           expect(entry.memory).to.have.property('privateBytes').that.is.greaterThan(0);
         }
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
           expect(entry.sandboxed).to.be.a('boolean');
         }
 
@@ -1119,7 +1119,7 @@ describe('app module', () => {
 
     it('succeeds with complete GPUInfo', async () => {
       const completeInfo = await getGPUInfo('complete');
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // For linux and macOS complete info is same as basic info
         await verifyBasicGPUInfo(completeInfo);
         const basicInfo = await getGPUInfo('basic');
@@ -1149,7 +1149,7 @@ describe('app module', () => {
     const socketPath = process.platform === 'win32' ? '\\\\.\\pipe\\electron-mixed-sandbox' : '/tmp/electron-mixed-sandbox';
 
     beforeEach(function (done) {
-      if (process.platform === 'linux' && (process.arch === 'arm64' || process.arch === 'arm')) {
+      if ((process.platform === 'linux' || process.platform === 'freebsd') && (process.arch === 'arm64' || process.arch === 'arm')) {
         // Our ARM tests are run on VSTS rather than CircleCI, and the Docker
         // setup on VSTS disallows syscalls that Chrome requires for setting up
         // sandboxing.
