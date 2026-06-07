--- packages/desktop/src/main/ipc/uploader.ts.orig	2026-06-05 03:43:05 UTC
+++ packages/desktop/src/main/ipc/uploader.ts
@@ -10,7 +10,7 @@ const buildPreferredPathEnv = (): string => {
   const extras =
     process.platform === 'darwin'
       ? ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', '/bin']
-      : process.platform === 'linux'
+      : (process.platform === 'linux' || process.platform === 'freebsd')
         ? ['/usr/local/bin', '/usr/bin', '/bin']
         : []
   const cur = (process.env.PATH || '').split(path.delimiter)
