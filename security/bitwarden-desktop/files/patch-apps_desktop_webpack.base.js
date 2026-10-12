--- apps/desktop/webpack.base.js.orig	2026-09-29 12:16:34 UTC
+++ apps/desktop/webpack.base.js
@@ -313,6 +313,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
