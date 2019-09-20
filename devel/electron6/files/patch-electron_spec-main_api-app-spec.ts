--- electron/spec-main/api-app-spec.ts.orig	2019-09-11 17:30:11 UTC
+++ electron/spec-main/api-app-spec.ts
@@ -109,7 +109,7 @@ describe('app module', () => {
   describe('app.getLocaleCountryCode()', () => {
     it('should be empty or have length of two', () => {
       let expectedLength = 2
-      if (isCI && process.platform === 'linux') {
+      if (isCI && (process.platform === 'linux' || process.platform === 'freebsd')) {
         // Linux CI machines have no locale.
         expectedLength = 0
       }
@@ -169,7 +169,7 @@ describe('app module', () => {
     })
 
     it('exits gracefully', async function () {
-      if (!['darwin', 'linux'].includes(process.platform)) {
+      if (!['darwin', 'linux', 'freebsd'].includes(process.platform)) {
         this.skip()
         return
       }
@@ -508,7 +508,7 @@ describe('app module', () => {
   describe('app.setBadgeCount', () => {
     const platformIsNotSupported =
         (process.platform === 'win32') ||
-        (process.platform === 'linux' && !app.isUnityRunning())
+        ((process.platform === 'linux' || process.platform === 'freebsd') && !app.isUnityRunning())
     const platformIsSupported = !platformIsNotSupported
 
     const expectedBadgeCount = 42
@@ -562,7 +562,7 @@ describe('app module', () => {
     ]
 
     before(function () {
-      if (process.platform === 'linux' || process.mas) this.skip()
+      if (process.platform === 'linux' || process.platform === 'freebsd' || process.mas) this.skip()
     })
 
     beforeEach(() => {
@@ -638,7 +638,7 @@ describe('app module', () => {
   })
 
   describe('accessibilitySupportEnabled property', () => {
-    if (process.platform === 'linux') return
+    if (process.platform === 'linux' || process.platform === 'freebsd') return
 
     it('returns whether the Chrome has accessibility APIs enabled', () => {
       expect(app.accessibilitySupportEnabled).to.be.a('boolean')
@@ -709,7 +709,7 @@ describe('app module', () => {
     let w: BrowserWindow
 
     before(function () {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip()
       }
     })
@@ -903,7 +903,7 @@ describe('app module', () => {
     // doesn't affect nested `describe`s.
     beforeEach(function () {
       // FIXME Get these specs running on Linux CI
-      if (process.platform === 'linux' && isCI) {
+      if ((process.platform === 'linux' || process.platform === 'freebsd') && isCI) {
         this.skip()
       }
     })
@@ -1060,7 +1060,7 @@ describe('app module', () => {
 
     it('succeeds with complete GPUInfo', async () => {
       const completeInfo = await getGPUInfo('complete')
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // For linux and macOS complete info is same as basic info
         await verifyBasicGPUInfo(completeInfo)
         const basicInfo = await getGPUInfo('basic')
