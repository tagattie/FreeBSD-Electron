--- main/menu.js.orig	2023-11-25 18:12:52 UTC
+++ main/menu.js
@@ -168,8 +168,8 @@ function buildAppMenu (options = {}) {
             sendIPCToWindow(window, 'print')
           }
         },
-        ...(!options.secondary && process.platform === 'linux' ? [{ type: 'separator' }] : []),
-        ...(!options.secondary && process.platform === 'linux' ? [quitAction] : [])
+        ...(!options.secondary && (process.platform === 'linux' || process.platform === 'freebsd') ? [{ type: 'separator' }] : []),
+        ...(!options.secondary && (process.platform === 'linux' || process.platform === 'freebsd') ? [quitAction] : [])
       ]
     },
     {
