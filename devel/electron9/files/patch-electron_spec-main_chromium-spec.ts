--- electron/spec-main/chromium-spec.ts.orig	2020-05-18 21:17:08 UTC
+++ electron/spec-main/chromium-spec.ts
@@ -1077,10 +1077,10 @@ describe('font fallback', () => {
     const fonts = await getRenderedFonts(html);
     expect(fonts).to.be.an('array');
     expect(fonts).to.have.length(1);
-    if (process.platform === 'win32') { expect(fonts[0].familyName).to.equal('Arial'); } else if (process.platform === 'darwin') { expect(fonts[0].familyName).to.equal('Helvetica'); } else if (process.platform === 'linux') { expect(fonts[0].familyName).to.equal('DejaVu Sans'); } // I think this depends on the distro? We don't specify a default.
+    if (process.platform === 'win32') { expect(fonts[0].familyName).to.equal('Arial'); } else if (process.platform === 'darwin') { expect(fonts[0].familyName).to.equal('Helvetica'); } else if (process.platform === 'linux' || process.platform === 'freebsd') { expect(fonts[0].familyName).to.equal('DejaVu Sans'); } // I think this depends on the distro? We don't specify a default.
   });
 
-  ifit(process.platform !== 'linux')('should fall back to Japanese font for sans-serif Japanese script', async function () {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('should fall back to Japanese font for sans-serif Japanese script', async function () {
     const html = `
     <html lang="ja-JP">
       <head>
