--- apps/desktop/webpack.base.js.orig	2026-02-02 09:34:46 UTC
+++ apps/desktop/webpack.base.js
@@ -278,6 +278,8 @@ module.exports.buildConfig = function buildConfig(para
             {
               loader: "sass-loader",
               options: {
+                api: "modern", 
+                implementation: require("sass"),
                 sourceMap: true,
               },
             },
