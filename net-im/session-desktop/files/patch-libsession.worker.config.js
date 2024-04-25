--- libsession.worker.config.js.orig	2024-04-12 00:30:58 UTC
+++ libsession.worker.config.js
@@ -18,6 +18,9 @@ module.exports = {
       {
         test: /\.node$/,
         loader: 'node-loader',
+        options: {
+          name: "[path][name].[ext]",
+        },
       },
     ],
   },
