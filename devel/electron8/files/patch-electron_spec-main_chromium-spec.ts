--- electron/spec-main/chromium-spec.ts.orig	2020-05-15 00:33:43 UTC
+++ electron/spec-main/chromium-spec.ts
@@ -1341,11 +1341,11 @@ describe('font fallback', () => {
       expect(fonts[0].familyName).to.equal('Arial')
     else if (process.platform === 'darwin')
       expect(fonts[0].familyName).to.equal('Helvetica')
-    else if (process.platform === 'linux')
+    else if (process.platform === 'linux' || process.platform === 'freebsd')
       expect(fonts[0].familyName).to.equal('DejaVu Sans') // I think this depends on the distro? We don't specify a default.
   })
 
-  ifit(process.platform !== 'linux')('should fall back to Japanese font for sans-serif Japanese script', async function () {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('should fall back to Japanese font for sans-serif Japanese script', async function () {
     const html = `
     <html lang="ja-JP">
       <head>
