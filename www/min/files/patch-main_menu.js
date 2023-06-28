--- main/menu.js.orig	2023-06-26 23:50:27 UTC
+++ main/menu.js
@@ -177,8 +177,8 @@ function buildAppMenu (options = {}) {
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
