--- src/main/ipc/uploader.ts.orig	2026-05-29 12:04:08 UTC
+++ src/main/ipc/uploader.ts
@@ -10,7 +10,7 @@ const buildPreferredPathEnv = (): string => {
   const extras =
     process.platform === 'darwin'
       ? ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', '/bin']
-      : process.platform === 'linux'
+      : (process.platform === 'linux' || process.platform === 'freebsd')
         ? ['/usr/local/bin', '/usr/bin', '/bin']
         : []
   const cur = (process.env.PATH || '').split(path.delimiter)
