--- apps/desktop/webpack.base.js.orig	2026-10-14 14:08:31 UTC
+++ apps/desktop/webpack.base.js
@@ -315,6 +315,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
