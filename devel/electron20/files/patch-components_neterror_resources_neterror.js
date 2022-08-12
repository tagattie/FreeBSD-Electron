--- components/neterror/resources/neterror.js.orig	2022-08-01 19:04:27 UTC
+++ components/neterror/resources/neterror.js
@@ -130,7 +130,7 @@ function detailsButtonClick() {
 
 let primaryControlOnLeft = true;
 // clang-format off
-// <if expr="is_macosx or is_ios or is_linux or chromeos_ash or chromeos_lacros or is_android">
+// <if expr="is_macosx or is_ios or is_bsd or chromeos_ash or chromeos_lacros or is_android">
 // clang-format on
 primaryControlOnLeft = false;
 // </if>
