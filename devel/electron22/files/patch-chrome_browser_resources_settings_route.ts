--- chrome/browser/resources/settings/route.ts.orig	2023-01-26 11:40:11 UTC
+++ chrome/browser/resources/settings/route.ts
@@ -202,7 +202,7 @@ function createBrowserSettingsRoutes(): Partial<Settin
     r.ACCESSIBILITY = r.ADVANCED.createSection(
         '/accessibility', 'a11y', loadTimeData.getString('a11yPageTitle'));
 
-    // <if expr="is_linux">
+    // <if expr="is_posix">
     r.CAPTIONS = r.ACCESSIBILITY.createChild('/captions');
     // </if>
 
