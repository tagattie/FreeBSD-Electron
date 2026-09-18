--- apps/desktop/webpack.base.js.orig	2026-09-07 14:06:16 UTC
+++ apps/desktop/webpack.base.js
@@ -301,6 +301,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
