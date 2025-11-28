--- libsession.worker.config.js.orig	2025-11-27 00:36:52 UTC
+++ libsession.worker.config.js
@@ -16,6 +16,9 @@ module.exports = {
       {
         test: /\.node$/,
         loader: 'node-loader',
+        options: {
+          name: "[path][name].[ext]",
+        },
       },
     ],
   },
