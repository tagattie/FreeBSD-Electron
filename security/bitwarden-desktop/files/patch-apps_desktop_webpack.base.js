--- apps/desktop/webpack.base.js.orig	2026-11-17 15:45:14 UTC
+++ apps/desktop/webpack.base.js
@@ -348,6 +348,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
