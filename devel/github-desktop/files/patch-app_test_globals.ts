--- app/test/globals.ts.orig	2023-03-14 01:36:07 UTC
+++ app/test/globals.ts
@@ -11,7 +11,7 @@ import 'airbnb-browser-shims/browser-only'
 const g: any = global
 g['__WIN32__'] = process.platform === 'win32'
 g['__DARWIN__'] = process.platform === 'darwin'
-g['__LINUX__'] = process.platform === 'linux'
+g['__LINUX__'] = (process.platform === 'linux' || process.platform === 'freebsd')
 g['__DEV__'] = 'false'
 g['__RELEASE_CHANNEL__'] = 'development'
 g['__UPDATES_URL__'] = ''
