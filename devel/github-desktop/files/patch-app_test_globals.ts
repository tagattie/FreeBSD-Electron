--- app/test/globals.ts.orig	2024-02-04 21:57:16 UTC
+++ app/test/globals.ts
@@ -19,7 +19,7 @@ g['__DARWIN__'] = process.platform === 'darwin'
 const g: any = global
 g['__WIN32__'] = process.platform === 'win32'
 g['__DARWIN__'] = process.platform === 'darwin'
-g['__LINUX__'] = process.platform === 'linux'
+g['__LINUX__'] = (process.platform === 'linux' || process.platform === 'freebsd')
 g['__APP_VERSION__'] = JSON.parse(
   readFileSync(join(__dirname, '../package.json'), 'utf8')
 ).version
