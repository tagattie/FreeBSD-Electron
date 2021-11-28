--- electron/spec/api-clipboard-spec.js.orig	2021-11-15 23:45:07 UTC
+++ electron/spec/api-clipboard-spec.js
@@ -30,7 +30,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
   describe('clipboard.readHTML()', () => {
     it('returns markup correctly', () => {
       const text = '<string>Hi</string>';
-      const markup = process.platform === 'darwin' ? "<meta charset='utf-8'><string>Hi</string>" : process.platform === 'linux' ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><string>Hi</string>' : '<string>Hi</string>';
+      const markup = process.platform === 'darwin' ? "<meta charset='utf-8'><string>Hi</string>" : (process.platform === 'linux' || process.platform === 'freebsd') ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><string>Hi</string>' : '<string>Hi</string>';
       clipboard.writeHTML(text);
       expect(clipboard.readHTML()).to.equal(markup);
     });
@@ -44,7 +44,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
     });
   });
 
-  ifdescribe(process.platform !== 'linux')('clipboard.readBookmark', () => {
+  ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('clipboard.readBookmark', () => {
     it('returns title and url', () => {
       clipboard.writeBookmark('a title', 'https://electronjs.org');
       expect(clipboard.readBookmark()).to.deep.equal({
@@ -61,7 +61,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
   });
 
   describe('clipboard.read()', () => {
-    ifit(process.platform !== 'linux')('does not crash when reading various custom clipboard types', () => {
+    ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('does not crash when reading various custom clipboard types', () => {
       const type = process.platform === 'darwin' ? 'NSFilenamesPboardType' : 'FileNameW';
 
       expect(() => {
@@ -82,7 +82,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
       const rtf = '{\\rtf1\\utf8 text}';
       const p = path.join(fixtures, 'assets', 'logo.png');
       const i = nativeImage.createFromPath(p);
-      const markup = process.platform === 'darwin' ? "<meta charset='utf-8'><b>Hi</b>" : process.platform === 'linux' ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><b>Hi</b>' : '<b>Hi</b>';
+      const markup = process.platform === 'darwin' ? "<meta charset='utf-8'><b>Hi</b>" : (process.platform === 'linux' || process.platform === 'freebsd') ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><b>Hi</b>' : '<b>Hi</b>';
       const bookmark = { title: 'a title', url: 'test' };
       clipboard.write({
         text: 'test',
@@ -98,7 +98,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
       const readImage = clipboard.readImage();
       expect(readImage.toDataURL()).to.equal(i.toDataURL());
 
-      if (process.platform !== 'linux') {
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') {
         expect(clipboard.readBookmark()).to.deep.equal(bookmark);
       }
     });
