--- electron/spec/api-clipboard-spec.js.orig	2021-11-08 18:41:28 UTC
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
@@ -46,7 +46,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
 
   describe('clipboard.readBookmark', () => {
     before(function () {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip();
       }
     });
@@ -72,7 +72,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
       const rtf = '{\\rtf1\\utf8 text}';
       const p = path.join(fixtures, 'assets', 'logo.png');
       const i = nativeImage.createFromPath(p);
-      const markup = process.platform === 'darwin' ? "<meta charset='utf-8'><b>Hi</b>" : process.platform === 'linux' ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><b>Hi</b>' : '<b>Hi</b>';
+      const markup = process.platform === 'darwin' ? "<meta charset='utf-8'><b>Hi</b>" : (process.platform === 'linux' || process.platform === 'freebsd') ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><b>Hi</b>' : '<b>Hi</b>';
       const bookmark = { title: 'a title', url: 'test' };
       clipboard.write({
         text: 'test',
@@ -88,7 +88,7 @@ ifdescribe(process.platform !== 'win32' || process.arc
       const readImage = clipboard.readImage();
       expect(readImage.toDataURL()).to.equal(i.toDataURL());
 
-      if (process.platform !== 'linux') {
+      if (process.platform !== 'linux' && process.platform !== 'freebsd') {
         expect(clipboard.readBookmark()).to.deep.equal(bookmark);
       }
     });
