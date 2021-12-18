--- chrome/browser/resources/settings/route.ts.orig	2021-11-19 04:25:09 UTC
+++ chrome/browser/resources/settings/route.ts
@@ -184,7 +184,7 @@ function createBrowserSettingsRoutes(): SettingsRoutes
 
     r.ACCESSIBILITY = r.ADVANCED.createSection('/accessibility', 'a11y');
 
-    // <if expr="is_linux">
+    // <if expr="is_posix">
     r.CAPTIONS = r.ACCESSIBILITY.createChild('/captions');
     // </if>
 
