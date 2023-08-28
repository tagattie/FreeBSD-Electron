--- app/test/globals.ts.orig	2023-08-26 16:06:35 UTC
+++ app/test/globals.ts
@@ -12,7 +12,7 @@ import { join } from 'path'
 const g: any = global
 g['__WIN32__'] = process.platform === 'win32'
 g['__DARWIN__'] = process.platform === 'darwin'
-g['__LINUX__'] = process.platform === 'linux'
+g['__LINUX__'] = (process.platform === 'linux' || process.platform === 'freebsd')
 g['__APP_VERSION__'] = require(join(__dirname, '../package.json')).version
 g['__DEV__'] = 'false'
 g['__RELEASE_CHANNEL__'] = 'development'
