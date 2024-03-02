--- main/menu.js.orig	2024-02-22 21:51:15 UTC
+++ main/menu.js
@@ -170,8 +170,8 @@ function buildAppMenu (options = {}) {
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
