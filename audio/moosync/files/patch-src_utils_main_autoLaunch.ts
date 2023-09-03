--- src/utils/main/autoLaunch.ts.orig	2023-08-30 00:01:06 UTC
+++ src/utils/main/autoLaunch.ts
@@ -18,7 +18,7 @@ export function enableStartup(enabled: boolean) {
       openAtLogin: enabled,
       enabled,
     })
-  } else if (process.platform === 'linux') {
+  } else if (process.platform === 'linux' || process.platform === 'freebsd') {
     const directory = path.resolve(os.homedir(), '.config/autostart')
 
     const fileName = path.join(directory, 'moosync.desktop')
