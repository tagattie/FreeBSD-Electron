--- electron/spec-main/api-browser-window-spec.ts.orig	2020-03-02 19:30:38 UTC
+++ electron/spec-main/api-browser-window-spec.ts
@@ -928,7 +928,7 @@ describe('BrowserWindow module', () => {
           w.setPosition(pos[0], pos[1])
         })
       })
-      ifdescribe(process.platform !== 'linux')(`Maximized state`, () => {
+      ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')(`Maximized state`, () => {
         it(`checks normal bounds when maximized`, (done) => {
           const bounds = w.getBounds()
           w.once('maximize', () => {
@@ -951,7 +951,7 @@ describe('BrowserWindow module', () => {
           w.maximize()
         })
       })
-      ifdescribe(process.platform !== 'linux')(`Minimized state`, () => {
+      ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')(`Minimized state`, () => {
         it(`checks normal bounds when minimized`, (done) => {
           const bounds = w.getBounds()
           w.once('minimize', () => {
@@ -1408,7 +1408,7 @@ describe('BrowserWindow module', () => {
   describe('BrowserWindow.setOpacity(opacity)', () => {
     afterEach(closeAllWindows)
 
-    ifdescribe(process.platform !== 'linux')(('Windows and Mac'), () => {
+    ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')(('Windows and Mac'), () => {
       it('make window with initial opacity', () => {
         const w = new BrowserWindow({ show: false, opacity: 0.5 })
         expect(w.getOpacity()).to.equal(0.5)
@@ -1434,7 +1434,7 @@ describe('BrowserWindow module', () => {
       })
     })
 
-    ifdescribe(process.platform === 'linux')(('Linux'), () => {
+    ifdescribe(process.platform === 'linux' || process.platform === 'freebsd')(('Linux'), () => {
       it('sets 1 regardless of parameter', () => {
         const w = new BrowserWindow({ show: false })
         w.setOpacity(0)
@@ -2227,7 +2227,7 @@ describe('BrowserWindow module', () => {
         expect(test.version).to.equal(process.version)
         expect(test.versions).to.deep.equal(process.versions)
 
-        if (process.platform === 'linux' && test.osSandbox) {
+        if ((process.platform === 'linux' || process.platform === 'freebsd') && test.osSandbox) {
           expect(test.creationTime).to.be.null('creation time')
           expect(test.systemMemoryInfo).to.be.null('system memory info')
         } else {
@@ -2735,7 +2735,7 @@ describe('BrowserWindow module', () => {
     })
   })
 
-  ifdescribe(process.platform !== 'linux')('max/minimize events', () => {
+  ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('max/minimize events', () => {
     afterEach(closeAllWindows)
     it('emits an event when window is maximized', (done) => {
       const w = new BrowserWindow({show: false})
@@ -3237,7 +3237,7 @@ describe('BrowserWindow module', () => {
     })
   })
 
-  ifdescribe(process.platform !== 'linux')('window states (excluding Linux)', () => {
+  ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('window states (excluding Linux)', () => {
     // Not implemented on Linux.
     afterEach(closeAllWindows)
 
