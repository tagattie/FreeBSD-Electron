--- main/menu.js.orig	2022-01-06 10:40:28 UTC
+++ main/menu.js
@@ -166,8 +166,8 @@ function buildAppMenu (options = {}) {
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
