--- apps/desktop/webpack.base.js.orig	2026-10-26 11:20:46 UTC
+++ apps/desktop/webpack.base.js
@@ -343,6 +343,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
