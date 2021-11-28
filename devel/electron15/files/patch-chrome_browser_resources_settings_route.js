--- chrome/browser/resources/settings/route.js.orig	2021-10-08 06:25:40 UTC
+++ chrome/browser/resources/settings/route.js
@@ -185,7 +185,7 @@ function createBrowserSettingsRoutes() {
 
     r.ACCESSIBILITY = r.ADVANCED.createSection('/accessibility', 'a11y');
 
-    // <if expr="chromeos or is_linux">
+    // <if expr="chromeos or is_posix">
     r.CAPTIONS = r.ACCESSIBILITY.createChild('/captions');
     // </if>
 
