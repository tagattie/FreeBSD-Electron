--- apps/desktop/webpack.base.js.orig	2026-01-14 15:06:19 UTC
+++ apps/desktop/webpack.base.js
@@ -272,6 +272,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
