--- apps/desktop/webpack.base.js.orig	2026-03-02 17:39:37 UTC
+++ apps/desktop/webpack.base.js
@@ -279,6 +279,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
