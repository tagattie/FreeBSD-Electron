--- libsession.worker.config.js.orig	2024-01-09 13:58:36 UTC
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
